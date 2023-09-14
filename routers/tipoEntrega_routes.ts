import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { TipoEntrega } from '../types';
import { crearNuevoTipoEntrega } from '../utils';

const routerTipoEntrega = express.Router();

// Middlewares
routerTipoEntrega.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo TipoEntrega
routerTipoEntrega.post('/nuevo', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const nuevoTipoEntrega: TipoEntrega = crearNuevoTipoEntrega({
      descripcion_tipoentrega: req.body.descripcion_tipoentrega
    });
    const registroInsertado: TipoEntrega[] = await guardarNuevoRegistro<TipoEntrega>(nuevoTipoEntrega, NameTables.TipoEntrega);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un TipoEntrega por su id
routerTipoEntrega.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrTipoEntrega: TipoEntrega[] = await obtenerRegistroPorColumna<TipoEntrega>(id, 'id_tipoentrega', NameTables.TipoEntrega);
    if (arrTipoEntrega.length === 0) {
      return res.status(404).json({ error: 'No hay TipoEntrega con ese ID!' });
    }
    return res.status(200).json(arrTipoEntrega);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de un TipoEntrega por ID
routerTipoEntrega.put('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevoTipoEntrega: TipoEntrega = crearNuevoTipoEntrega({
      descripcion_tipoentrega: req.body.descripcion_tipoentrega
    });
    const TipoEntregaActualizado: TipoEntrega[] = await actualizarRegistroPorID<TipoEntrega>(id, nuevoTipoEntrega, NameTables.TipoEntrega);
    return res.status(200).json(TipoEntregaActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un Tipo de pago  por id
routerTipoEntrega.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const TipoEntregaEliminado: TipoEntrega[] = await borrarRegistroPorID<TipoEntrega>(id, NameTables.TipoEntrega);
    return res.status(200).json(TipoEntregaEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerTipoEntrega;