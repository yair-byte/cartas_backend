import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerRegistroPorDosColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { LocalCarta_TipoEntrega } from '../types';
import { crearNuevoLocalCartaTipoEntrega } from '../utils';

const routerLocalTipoEntrega = express.Router();

// Middlewares
routerLocalTipoEntrega.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo LocalTipoEntrega
routerLocalTipoEntrega.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevoLocalCartaTipoEntrega: LocalCarta_TipoEntrega = crearNuevoLocalCartaTipoEntrega({
      id_localcarta: req.body.id_localcarta,
      id_tipoentrega: req.body.id_tipoentrega
    });
    const registroInsertado: LocalCarta_TipoEntrega[] = await guardarNuevoRegistro<LocalCarta_TipoEntrega>(nuevoLocalCartaTipoEntrega, NameTables.LocalCarta_TipoEntrega);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un LocalTipoEntrega por su id
routerLocalTipoEntrega.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrLocalCarta_TipoEntrega: LocalCarta_TipoEntrega[] = await obtenerRegistroPorColumna<LocalCarta_TipoEntrega>(id, 'id_localcarta_tipoentrega', NameTables.LocalCarta_TipoEntrega);
    if (arrLocalCarta_TipoEntrega.length === 0) {
      return res.status(404).json({ error: 'No hay arrLocalCarta_TipoEntrega con ese ID!' });
    }
    return res.status(200).json(arrLocalCarta_TipoEntrega);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un LocalTipoEntrega por sus FKs
routerLocalTipoEntrega.get('/:id1/:id2', async (req: Request, res: Response) => {
  try {
    const id1: number = parseInt(req.params.id1, 10);
    const id2: number = parseInt(req.params.id2, 10);
    const arrLocalCarta_TipoEntrega: LocalCarta_TipoEntrega[] = await obtenerRegistroPorDosColumna<LocalCarta_TipoEntrega>(id1, id2, 'id_localcarta', 'id_tipoentrega', NameTables.LocalCarta_TipoEntrega);
    if (arrLocalCarta_TipoEntrega.length === 0) {
      return res.status(404).json({ error: 'No hay arrLocalCarta_TipoEntrega para esa combinacion de FKs!' });
    }
    return res.status(200).json(arrLocalCarta_TipoEntrega);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de un LocalTipoEntrega por ID
routerLocalTipoEntrega.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevoLocalCarta_TipoEntrega: LocalCarta_TipoEntrega = crearNuevoLocalCartaTipoEntrega({
      id_localcarta: req.body.id_localcarta,
      id_tipoentrega: req.body.id_tipoentrega
    });
    const LocalCarta_TipoEntregaActualizado: LocalCarta_TipoEntrega[] = await actualizarRegistroPorID<LocalCarta_TipoEntrega>(id, nuevoLocalCarta_TipoEntrega, NameTables.LocalCarta_TipoEntrega);
    return res.status(200).json(LocalCarta_TipoEntregaActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un LocalTipoEntrega  por id
routerLocalTipoEntrega.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const LocalCartaTipoEntregaEliminado: LocalCarta_TipoEntrega[] = await borrarRegistroPorID<LocalCarta_TipoEntrega>(id, NameTables.LocalCarta_TipoEntrega);
    return res.status(200).json(LocalCartaTipoEntregaEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerLocalTipoEntrega;