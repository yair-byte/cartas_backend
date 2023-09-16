import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerRegistroPorDosColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Comida_Tamanio_Pedido } from '../types';
import { crearNuevaComidaTamanioPedidos } from '../utils';

const routerComidaTamanioPedidos = express.Router();

// Middlewares
routerComidaTamanioPedidos.use(express.json());  //convierte JSON a Object JS

// Crear una nueva ComidaTamanioPedidos
routerComidaTamanioPedidos.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevaComidaTamanioPedido: Comida_Tamanio_Pedido = crearNuevaComidaTamanioPedidos({
      id_comida: req.body.id_comida,
      id_tamanio: req.body.id_tamanio,
      precio_unidad: req.body.precio_unidad,
      disponible: req.body.disponible,
      oferta: req.body.oferta
    });
    const registroInsertado: Comida_Tamanio_Pedido[] = await guardarNuevoRegistro<Comida_Tamanio_Pedido>(nuevaComidaTamanioPedido, NameTables.Comida_Tamanio_Pedido);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener una ComidaTamanioPedidos por su id
routerComidaTamanioPedidos.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrComidaTamanioPedidos: Comida_Tamanio_Pedido[] = await obtenerRegistroPorColumna<Comida_Tamanio_Pedido>(id, 'id_comida_tamanio_pedido', NameTables.Comida_Tamanio_Pedido);
    if (arrComidaTamanioPedidos.length === 0) {
      return res.status(404).json({ error: 'No hay ComidaTamanioPedidos con ese ID!' });
    }
    return res.status(200).json(arrComidaTamanioPedidos);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener una ComidaTamanioPedidos por sus FKs
routerComidaTamanioPedidos.get('/:id1/:id2', async (req: Request, res: Response) => {
  try {
    const id1: number = parseInt(req.params.id1, 10);
    const id2: number = parseInt(req.params.id2, 10);
    const arrComidaTamanioPedido: Comida_Tamanio_Pedido[] = await obtenerRegistroPorDosColumna<Comida_Tamanio_Pedido>(id1, id2, 'id_comida_tamanio', 'id_pedido', NameTables.Comida_Tamanio_Pedido);
    if (arrComidaTamanioPedido.length === 0) {
      return res.status(404).json({ error: 'No hay Comida_Tamanio_Pedido para esa combinacion de FKs!' });
    }
    return res.status(200).json(arrComidaTamanioPedido);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de una ComidaTamanioPedidos por ID
routerComidaTamanioPedidos.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevaComidaTamanioPedido: Comida_Tamanio_Pedido = crearNuevaComidaTamanioPedidos({
      id_comida: req.body.id_comida,
      id_tamanio: req.body.id_tamanio,
      precio_unidad: req.body.precio_unidad,
      disponible: req.body.disponible,
      oferta: req.body.oferta
    });
    const nuevaComidaTamanioPedidoActualizado: Comida_Tamanio_Pedido[] = await actualizarRegistroPorID<Comida_Tamanio_Pedido>(id, nuevaComidaTamanioPedido, NameTables.Comida_Tamanio_Pedido);
    return res.status(200).json(nuevaComidaTamanioPedidoActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar una ComidaTamanioPedidos  por id
routerComidaTamanioPedidos.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const ComidaTamanioPedidoEliminado: Comida_Tamanio_Pedido[] = await borrarRegistroPorID<Comida_Tamanio_Pedido>(id, NameTables.Comida_Tamanio_Pedido);
    return res.status(200).json(ComidaTamanioPedidoEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerComidaTamanioPedidos;