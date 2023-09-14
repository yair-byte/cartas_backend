import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Seccion_TipoPlato } from '../types';
import { crearNuevaSeccionTipoPlato } from '../utils';

const routerSeccionTipoPlato = express.Router();

// Middlewares
routerSeccionTipoPlato.use(express.json());  //convierte JSON a Object JS

// Crear una nueva SeccionTipoPlato
routerSeccionTipoPlato.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevaSeccionTipoPlato: Seccion_TipoPlato = crearNuevaSeccionTipoPlato({
      id_seccion: req.body.id_seccion,
      id_tipoplato: req.body.id_tipoplato
    });
    const registroInsertado: Seccion_TipoPlato[] = await guardarNuevoRegistro<Seccion_TipoPlato>(nuevaSeccionTipoPlato, NameTables.Seccion_TipoPlato);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener una SeccionTipoPlato por su id
routerSeccionTipoPlato.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrSeccionesTipoPlato: Seccion_TipoPlato[] = await obtenerRegistroPorColumna<Seccion_TipoPlato>(id, 'id_seccion_tipoplato', NameTables.Seccion_TipoPlato);
    if (arrSeccionesTipoPlato.length === 0) {
      return res.status(404).json({ error: 'No hay SeccionesTipoPlato con ese ID!' });
    }
    return res.status(200).json(arrSeccionesTipoPlato);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de una SeccionTipoPlato
routerSeccionTipoPlato.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevaSeccionTipoPlato: Seccion_TipoPlato = crearNuevaSeccionTipoPlato({
      id_seccion: req.body.id_seccion,
      id_tipoplato: req.body.id_tipoplato
    });
    const SeccionTipoPlatoActualizado: Seccion_TipoPlato[] = await actualizarRegistroPorID<Seccion_TipoPlato>(id, nuevaSeccionTipoPlato, NameTables.Seccion_TipoPlato);
    return res.status(200).json(SeccionTipoPlatoActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar una Seccion por id
routerSeccionTipoPlato.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const SeccionTipoPlatoEliminado: Seccion_TipoPlato[] = await borrarRegistroPorID<Seccion_TipoPlato>(id, NameTables.Seccion_TipoPlato);
    return res.status(200).json(SeccionTipoPlatoEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerSeccionTipoPlato;