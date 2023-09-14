import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerRegistroPorDosColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { LocalCarta_Seccion } from '../types';
import { crearNuevoLocalCartaSeccion } from '../utils';

const routerLocalSeccion = express.Router();

// Middlewares
routerLocalSeccion.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo LocalCarta-Seccion
routerLocalSeccion.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevoLocalCartaSeccion: LocalCarta_Seccion = crearNuevoLocalCartaSeccion({
      id_localcarta: req.body.id_localcarta,
      id_tipopago: req.body.id_tipopago
    });
    const registroInsertado: LocalCarta_Seccion[] = await guardarNuevoRegistro<LocalCarta_Seccion>(nuevoLocalCartaSeccion, NameTables.LocalCarta_Seccion);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un LocalCarta-Seccion por su id
routerLocalSeccion.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrLocalCarta_Seccion: LocalCarta_Seccion[] = await obtenerRegistroPorColumna<LocalCarta_Seccion>(id, 'id_localcarta_seccion', NameTables.LocalCarta_Seccion);
    if (arrLocalCarta_Seccion.length === 0) {
      return res.status(404).json({ error: 'No hay LocalCarta_Seccion con ese ID!' });
    }
    return res.status(200).json(arrLocalCarta_Seccion);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un LocalCarta-Seccion  por sus FKs
routerLocalSeccion.get('/:id1/:id2', async (req: Request, res: Response) => {
  try {
    const id1: number = parseInt(req.params.id1, 10);
    const id2: number = parseInt(req.params.id2, 10);
    const arrLocalCarta_Seccion: LocalCarta_Seccion[] = await obtenerRegistroPorDosColumna<LocalCarta_Seccion>(id1, id2, 'id_localcarta', 'id_seccion', NameTables.LocalCarta_Seccion);
    if (arrLocalCarta_Seccion.length === 0) {
      return res.status(404).json({ error: 'No hay arrLocalCarta_Seccion para esa combinacion de FKs!' });
    }
    return res.status(200).json(arrLocalCarta_Seccion);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de un LocalCarta-Seccion por ID
routerLocalSeccion.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevoLocalCartaSeccion: LocalCarta_Seccion = crearNuevoLocalCartaSeccion({
      id_localcarta: req.body.id_localcarta,
      id_tipopago: req.body.id_tipopago
    });
    const LocalCarta_SeccionActualizado: LocalCarta_Seccion[] = await actualizarRegistroPorID<LocalCarta_Seccion>(id, nuevoLocalCartaSeccion, NameTables.LocalCarta_Seccion);
    return res.status(200).json(LocalCarta_SeccionActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un LocalCarta-Seccion  por id
routerLocalSeccion.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const LocalCarta_SeccionEliminado: LocalCarta_Seccion[] = await borrarRegistroPorID<LocalCarta_Seccion>(id, NameTables.LocalCarta_Seccion);
    return res.status(200).json(LocalCarta_SeccionEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerLocalSeccion;