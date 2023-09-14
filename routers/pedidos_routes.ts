import express from 'express';
import { Request, Response } from 'express';
import { borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerTablaCompleta, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Pedido } from '../types';
import { crearNuevoPedido } from '../utils';

const routerPedidos = express.Router();

// Middlewares
routerPedidos.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo Pedido
routerPedidos.post('/nuevo', async (req: Request, res: Response) => {
  try {
    const nuevoPedido: Pedido = crearNuevoPedido({
      id_localcarta: req.body.id_localcarta,
      nombre_cliente: req.body.nombre_cliente,
      fecha_pedido: req.body.fecha_pedido,
      direccion_cliente: req.body.direccion_cliente,
      nro_mesa: req.body.nro_mesa,
      precio_total: req.body.precio_total
    });
    const registroInsertado: Pedido[] = await guardarNuevoRegistro<Pedido>(nuevoPedido, NameTables.Pedido);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un pedido por id
routerPedidos.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrPedidos: Pedido[] = await obtenerRegistroPorColumna<Pedido>(id, 'id_pedido', NameTables.Pedido);
    if (arrPedidos.length === 0) {
      return res.status(404).json({ error: 'No hay Pedidos con ese ID!' });
    }
    return res.status(200).json(arrPedidos);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  Obtener todos los Pedidos 
routerPedidos.get('/', async (_req: Request, res: Response) => {
  try {
    const pedidos: Pedido[] = await obtenerTablaCompleta<Pedido>(NameTables.Pedido);
    return res.status(200).json(pedidos);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un Pedido por id
routerPedidos.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const pedidoEliminado: Pedido[] = await borrarRegistroPorID<Pedido>(id, NameTables.Pedido);
    return res.status(200).json(pedidoEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerPedidos;