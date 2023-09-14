import express from 'express';
import { Request, Response } from 'express';
import { borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Tamanio } from '../types';
import { crearNuevoTamanio } from '../utils';

const routerTamanios = express.Router();

// Middlewares
routerTamanios.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo Tamanio
routerTamanios.post('/nuevo', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const nuevoTamanio: Tamanio = crearNuevoTamanio({
      tamanio: req.body.tamanio
    });
    const registroInsertado: Tamanio[] = await guardarNuevoRegistro<Tamanio>(nuevoTamanio, NameTables.Tamanio);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un Tamanio por su id
routerTamanios.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrTamanios: Tamanio[] = await obtenerRegistroPorColumna<Tamanio>(id, 'id_tamanio', NameTables.Tamanio);
    if (arrTamanios.length === 0) {
      return res.status(404).json({ error: 'No hay Tamaños con ese ID!' });
    }
    return res.status(200).json(arrTamanios);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un tamanio por id
routerTamanios.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const tamanioEliminado: Tamanio[] = await borrarRegistroPorID<Tamanio>(id, NameTables.Tamanio);
    return res.status(200).json(tamanioEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerTamanios;