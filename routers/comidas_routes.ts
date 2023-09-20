import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Comida } from '../types';
import { crearNuevaComida } from '../utils';

const routerComidas = express.Router();

// Middlewares
routerComidas.use(express.json());  //convierte JSON a Object JS

// Crear una nueva comida
routerComidas.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevaComida: Comida = crearNuevaComida({
      id_tipoplato: req.body.id_tipoplato,
      nombre_comida: req.body.nombre_comida,
      ingredientes: req.body.ingredientes,
      precio_unidad: req.body.precio_unidad,
      disponible: true 
    });
    const registroInsertado: Comida[] = await guardarNuevoRegistro<Comida>(nuevaComida, NameTables.Comida);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener una comida por su id
routerComidas.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrComidas: Comida[] = await obtenerRegistroPorColumna<Comida>(id, 'id_comida', NameTables.Comida);
    if (arrComidas.length === 0) {
      return res.status(404).json({ error: 'No hay Comidas con ese ID!' });
    }
    return res.status(200).json(arrComidas);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de una comida por su id
routerComidas.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevaComida: Comida = crearNuevaComida({
      id_tipoplato: req.body.id_tipoplato,
      nombre_comida: req.body.nombre_comida,
      ingredientes: req.body.ingredientes,
      precio_unidad: req.body.precio_unidad,
      disponible: req.body.disponible
    });
    const comidaActualizado: Comida[] = await actualizarRegistroPorID<Comida>(id, nuevaComida, NameTables.Comida);
    return res.status(200).json(comidaActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar una comida por id
routerComidas.delete('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const comidaEliminada: Comida[] = await borrarRegistroPorID<Comida>(id, NameTables.Comida);
    return res.status(200).json(comidaEliminada);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerComidas;