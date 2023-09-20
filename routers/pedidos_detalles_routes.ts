import express from 'express';
import { Request, Response } from 'express';
import { borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerRegistroPorID, obtenerTablaCompleta, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Pedido_Detalle } from '../types';
import { crearNuevoPedidoDetalle } from '../utils';

const routerPedidosDetalles = express.Router();

// Middlewares
routerPedidosDetalles.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo PedidosDetalles
routerPedidosDetalles.post('/nuevo', async (req: Request, res: Response) => {
  try {
    const nuevoPedidoDetalle: Pedido_Detalle = crearNuevoPedidoDetalle({
      id_pedido_detalle: req.body.id_pedido_detalle,
      id_pedido: req.body.id_pedido,
      comida_descripcion: req.body.comida_descripcion,
      precio_unidad: req.body.precio_unidad,
      cantidad_unidades: req.body.cantidad_unidades
    });
    const registroInsertado: Pedido_Detalle[] = await guardarNuevoRegistro<Pedido_Detalle>(nuevoPedidoDetalle, NameTables.Pedido_Detalle);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un PedidosDetalles por id 
routerPedidosDetalles.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrPedidosDetalles: Pedido_Detalle[] = await obtenerRegistroPorID<Pedido_Detalle>(id, NameTables.Pedido_Detalle);
    if (arrPedidosDetalles.length === 0) {
      return res.status(404).json({ error: 'No hay Pedidos Detalles con ese ID !' });
    }
    return res.status(200).json(arrPedidosDetalles);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un PedidosDetalles por id de Pedido
routerPedidosDetalles.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrPedidosDetalles: Pedido_Detalle[] = await obtenerRegistroPorColumna<Pedido_Detalle>(id, 'id_pedido', NameTables.Pedido_Detalle);
    if (arrPedidosDetalles.length === 0) {
      return res.status(404).json({ error: 'No hay Pedidos Detalles con ese ID de pedido!' });
    }
    return res.status(200).json(arrPedidosDetalles);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  Obtener todos los PedidosDetalles 
routerPedidosDetalles.get('/', async (_req: Request, res: Response) => {
  try {
    const pedidosDetalles: Pedido_Detalle[] = await obtenerTablaCompleta<Pedido_Detalle>(NameTables.Pedido_Detalle);
    return res.status(200).json(pedidosDetalles);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un PedidosDetalles por id
routerPedidosDetalles.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const pedidoDetallesEliminado: Pedido_Detalle[] = await borrarRegistroPorID<Pedido_Detalle>(id, NameTables.Pedido_Detalle);
    return res.status(200).json(pedidoDetallesEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerPedidosDetalles;