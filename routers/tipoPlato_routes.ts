import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { TipoPlato } from '../types';
import { crearNuevoTipoPlato } from '../utils';

const routerTipoPlato = express.Router();

// Middlewares
routerTipoPlato.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo TipoPlato
routerTipoPlato.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevoTipoPlato: TipoPlato = crearNuevoTipoPlato({
      nombre_tipoplato: req.body.nombre_tipoplato,
      descripcion_tipoplato: req.body.descripcion_tipoplato
    });
    const registroInsertado: TipoPlato[] = await guardarNuevoRegistro<TipoPlato>(nuevoTipoPlato, NameTables.TipoPlato);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un TipoPlato por su id
routerTipoPlato.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrTiposPlato: TipoPlato[] = await obtenerRegistroPorColumna<TipoPlato>(id, 'id_tipoplato', NameTables.TipoPlato);
    if (arrTiposPlato.length === 0) {
      return res.status(404).json({ error: 'No hay TiposPlato con ese ID!' });
    }
    return res.status(200).json(arrTiposPlato);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de un TipoPlato
routerTipoPlato.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevoTipoPlato: TipoPlato = crearNuevoTipoPlato({
      nombre_tipoplato: req.body.nombre_tipoplato,
      descripcion_tipoplato: req.body.descripcion_tipoplato
    });
    const TipoPlatoActualizado: TipoPlato[] = await actualizarRegistroPorID<TipoPlato>(id, nuevoTipoPlato, NameTables.TipoPlato);
    return res.status(200).json(TipoPlatoActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un TipoPlato por id
routerTipoPlato.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const TipoPlatoEliminado: TipoPlato[] = await borrarRegistroPorID<TipoPlato>(id, NameTables.TipoPlato);
    return res.status(200).json(TipoPlatoEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerTipoPlato;