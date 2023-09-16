import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Seccion } from '../types';
import { crearNuevaSeccion } from '../utils';

const routerSecciones = express.Router();

// Middlewares
routerSecciones.use(express.json());  //convierte JSON a Object JS

// Crear una nueva Seccion
routerSecciones.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevaSeccion: Seccion = crearNuevaSeccion({
      nombre_seccion: req.body.nombre_seccion
    });
    const registroInsertado: Seccion[] = await guardarNuevoRegistro<Seccion>(nuevaSeccion, NameTables.Seccion);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener una Seccion por su id
routerSecciones.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrSecciones: Seccion[] = await obtenerRegistroPorColumna<Seccion>(id, 'id_seccion', NameTables.Seccion);
    if (arrSecciones.length === 0) {
      return res.status(404).json({ error: 'No hay Secciones con ese ID!' });
    }
    return res.status(200).json(arrSecciones);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de una Seccion por ID
routerSecciones.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevaSeccion: Seccion = crearNuevaSeccion({
      nombre_seccion: req.body.nombre_seccion
    });
    const SeccionActualizado: Seccion[] = await actualizarRegistroPorID<Seccion>(id, nuevaSeccion, NameTables.Seccion);
    return res.status(200).json(SeccionActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar una Seccion por id
routerSecciones.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const SeccionEliminado: Seccion[] = await borrarRegistroPorID<Seccion>(id, NameTables.Seccion);
    return res.status(200).json(SeccionEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerSecciones;