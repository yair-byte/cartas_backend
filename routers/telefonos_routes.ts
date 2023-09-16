import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Telefono } from '../types';
import { crearNuevoTelefono } from '../utils';

const routerTelefonos = express.Router();

// Middlewares
routerTelefonos.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo Telefono
routerTelefonos.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevoTelefono: Telefono = crearNuevoTelefono({
      nro_telefono: req.body.nro_telefono,
      id_localcarta: req.body.id_localcarta,
      es_principal: req.body.es_principal,
    });
    const registroInsertado: Telefono[] = await guardarNuevoRegistro<Telefono>(nuevoTelefono, NameTables.Telefono);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un Telefono por su id
routerTelefonos.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrTelefonos: Telefono[] = await obtenerRegistroPorColumna<Telefono>(id, 'id_telefono', NameTables.Telefono);
    if (arrTelefonos.length === 0) {
      return res.status(404).json({ error: 'No hay Telefonos con ese ID!' });
    }
    return res.status(200).json(arrTelefonos);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de un Telefono por ID
routerTelefonos.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevoTelefono: Telefono = crearNuevoTelefono({
      nro_telefono: req.body.nro_telefono,
      id_localcarta: req.body.id_localcarta,
      es_principal: req.body.es_principal,
    });
    const TelefonoActualizado: Telefono[] = await actualizarRegistroPorID<Telefono>(id, nuevoTelefono, NameTables.Telefono);
    return res.status(200).json(TelefonoActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un telefono por id
routerTelefonos.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const telefonoEliminado: Telefono[] = await borrarRegistroPorID<Telefono>(id, NameTables.Telefono);
    return res.status(200).json(telefonoEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerTelefonos;