import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerRegistroPorDosColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { LocalCarta_TipoPago } from '../types';
import { crearNuevoLocalCartaTipoPago } from '../utils';

const routerLocalTipoPago = express.Router();

// Middlewares
routerLocalTipoPago.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo LocalCartaTipoPago
routerLocalTipoPago.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevoLocalCartaTipoPago: LocalCarta_TipoPago = crearNuevoLocalCartaTipoPago({
      id_localcarta: req.body.id_localcarta,
      id_tipopago: req.body.id_tipopago
    });
    const registroInsertado: LocalCarta_TipoPago[] = await guardarNuevoRegistro<LocalCarta_TipoPago>(nuevoLocalCartaTipoPago, NameTables.LocalCarta_TipoPago);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un LocalCartaTipoPago por su id
routerLocalTipoPago.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrLocalCarta_TipoPago: LocalCarta_TipoPago[] = await obtenerRegistroPorColumna<LocalCarta_TipoPago>(id, 'id_localcarta_tipopago', NameTables.LocalCarta_TipoPago);
    if (arrLocalCarta_TipoPago.length === 0) {
      return res.status(404).json({ error: 'No hay LocalCarta_TipoPago con ese ID!' });
    }
    return res.status(200).json(arrLocalCarta_TipoPago);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un LocalCartaTipoPago por sus FKs
routerLocalTipoPago.get('/:id1/:id2', async (req: Request, res: Response) => {
  try {
    const id1: number = parseInt(req.params.id1, 10);
    const id2: number = parseInt(req.params.id2, 10);
    const arrLocalCarta_TipoPago: LocalCarta_TipoPago[] = await obtenerRegistroPorDosColumna<LocalCarta_TipoPago>(id1, id2, 'id_localcarta', 'id_tipopago', NameTables.LocalCarta_TipoPago);
    if (arrLocalCarta_TipoPago.length === 0) {
      return res.status(404).json({ error: 'No hay LocalCarta_TipoPago para esa combinacion de FKs!' });
    }
    return res.status(200).json(arrLocalCarta_TipoPago);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de un LocalCartaTipoPago por ID
routerLocalTipoPago.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevoLocalCarta_TipoPago: LocalCarta_TipoPago = crearNuevoLocalCartaTipoPago({
      id_localcarta: req.body.id_localcarta,
      id_tipopago: req.body.id_tipopago
    });
    const LocalCarta_TipoPagoActualizado: LocalCarta_TipoPago[] = await actualizarRegistroPorID<LocalCarta_TipoPago>(id, nuevoLocalCarta_TipoPago, NameTables.LocalCarta_TipoPago);
    return res.status(200).json(LocalCarta_TipoPagoActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un LocalCartaTipoPago  por id
routerLocalTipoPago.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const LocalCartaTipoPagoEliminado: LocalCarta_TipoPago[] = await borrarRegistroPorID<LocalCarta_TipoPago>(id, NameTables.LocalCarta_TipoPago);
    return res.status(200).json(LocalCartaTipoPagoEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerLocalTipoPago;