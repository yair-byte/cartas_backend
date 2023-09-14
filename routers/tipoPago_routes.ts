import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { TipoPago } from '../types';
import { crearNuevoTipoPago } from '../utils';

const routerTipoPago = express.Router();

// Middlewares
routerTipoPago.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo TipoPago
routerTipoPago.post('/nuevo', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const nuevoTipoPago: TipoPago = crearNuevoTipoPago({
      descripcion_tipopago: req.body.descripcion_tipopago
    });
    const registroInsertado: TipoPago[] = await guardarNuevoRegistro<TipoPago>(nuevoTipoPago, NameTables.TipoPago);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un Tipo de pago por su id
routerTipoPago.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrTipoPago: TipoPago[] = await obtenerRegistroPorColumna<TipoPago>(id, 'id_tipopago', NameTables.TipoPago);
    if (arrTipoPago.length === 0) {
      return res.status(404).json({ error: 'No hay TipoPago con ese ID!' });
    }
    return res.status(200).json(arrTipoPago);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de un Tipo de pago por ID
routerTipoPago.put('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevoTipoPago: TipoPago = crearNuevoTipoPago({
      descripcion_tipopago: req.body.descripcion_tipopago
    });
    const TipoPagoActualizado: TipoPago[] = await actualizarRegistroPorID<TipoPago>(id, nuevoTipoPago, NameTables.TipoPago);
    return res.status(200).json(TipoPagoActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un Tipo de pago  por id
routerTipoPago.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const TipoPagoEliminado: TipoPago[] = await borrarRegistroPorID<TipoPago>(id, NameTables.TipoPago);
    return res.status(200).json(TipoPagoEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerTipoPago;