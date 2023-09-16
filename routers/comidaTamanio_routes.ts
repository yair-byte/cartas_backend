import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerRegistroPorDosColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Comida_Tamanio } from '../types';
import { crearNuevaComidaTamanio } from '../utils';

const routerComidaTamanio = express.Router();

// Middlewares
routerComidaTamanio.use(express.json());  //convierte JSON a Object JS

// Crear una nueva ComidaTamanio
routerComidaTamanio.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevaComidaTamanio: Comida_Tamanio = crearNuevaComidaTamanio({
      id_comida: req.body.id_comida,
      id_tamanio: req.body.id_tamanio,
      precio_unidad: req.body.precio_unidad,
      disponible: req.body.disponible,
      oferta: req.body.oferta
    });
    const registroInsertado: Comida_Tamanio[] = await guardarNuevoRegistro<Comida_Tamanio>(nuevaComidaTamanio, NameTables.Comida_Tamanio);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener una ComidaTamanio por su id
routerComidaTamanio.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrComidaTamanio: Comida_Tamanio[] = await obtenerRegistroPorColumna<Comida_Tamanio>(id, 'id_comida_tamanio', NameTables.Comida_Tamanio);
    if (arrComidaTamanio.length === 0) {
      return res.status(404).json({ error: 'No hay Comida_Tamanio con ese ID!' });
    }
    return res.status(200).json(arrComidaTamanio);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener una ComidaTamanio por sus FKs
routerComidaTamanio.get('/:id1/:id2', async (req: Request, res: Response) => {
  try {
    const id1: number = parseInt(req.params.id1, 10);
    const id2: number = parseInt(req.params.id2, 10);
    const arrComidaTamanio: Comida_Tamanio[] = await obtenerRegistroPorDosColumna<Comida_Tamanio>(id1, id2, 'id_comida', 'id_tamanio', NameTables.Comida_Tamanio);
    if (arrComidaTamanio.length === 0) {
      return res.status(404).json({ error: 'No hay ComidaTamanio para esa combinacion de FKs!' });
    }
    return res.status(200).json(arrComidaTamanio);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de una ComidaTamanio por ID
routerComidaTamanio.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevaComidaTamanio: Comida_Tamanio = crearNuevaComidaTamanio({
      id_comida: req.body.id_comida,
      id_tamanio: req.body.id_tamanio,
      precio_unidad: req.body.precio_unidad,
      disponible: req.body.disponible,
      oferta: req.body.oferta
    });
    const nuevaComidaTamanioActualizado: Comida_Tamanio[] = await actualizarRegistroPorID<Comida_Tamanio>(id, nuevaComidaTamanio, NameTables.Comida_Tamanio);
    return res.status(200).json(nuevaComidaTamanioActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar una ComidaTamanio  por id
routerComidaTamanio.delete('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const ComidaTamanioEliminado: Comida_Tamanio[] = await borrarRegistroPorID<Comida_Tamanio>(id, NameTables.Comida_Tamanio);
    return res.status(200).json(ComidaTamanioEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerComidaTamanio;