import express from 'express';
import { Request, Response } from 'express';
import {  guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerTablaCompleta, verificarPermisos } from '../services/services';
import { NameTables, Permission  } from '../enums';
import { LocalCarta } from '../types';
import {  crearNuevolocalCarta } from '../utils';

const routerLocales = express.Router();

// Middlewares
routerLocales.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo local
routerLocales.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevoLocalCarta: LocalCarta = crearNuevolocalCarta({
      id_usuario: req.body.id_usuario,
      nombre_local: req.body.nombre_local,
      descripcion_local: req.body.descripcion_local,
      nombre_carta: req.body.nombre_carta,
      descripcion_carta: req.body.descripcion_carta,
      cdi: req.body.cdi,
      calle: req.body.calle,
      altura: req.body.altura,
      piso: req.body.piso,
      activo: true
    });
    const registroInsertado: LocalCarta[] = await guardarNuevoRegistro<LocalCarta>(nuevoLocalCarta, NameTables.LocalCarta);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener el local de un usuario, id usuario por param
routerLocales.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrLocales: LocalCarta[] = await obtenerRegistroPorColumna<LocalCarta>(id, 'id_usuario', NameTables.LocalCarta);
    if (arrLocales.length === 0) {
      return res.status(404).json({ error: 'El usuario no tiene locales asociados!' });
    }
    return res.status(200).json(arrLocales);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  Obtener todos los Locales 
routerLocales.get('/',  async (_req: Request, res: Response) => {
  try {
    const locales: LocalCarta[] = await obtenerTablaCompleta<LocalCarta>(NameTables.LocalCarta);
    return res.status(200).json(locales);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

/*
// actualizar datos de un local de un usuario
routerLocales.put('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const passwordHash = await bcrypt.hash(req.body.contrasenia, 10);
    const nuevoUsuario: Usuario = crearNuevoUsuario({
      nombre_usuario: req.body.nombre_usuario,
      contrasenia: passwordHash,
      correo_electronico: req.body.correo_electronico,
      role: req.body.role,
      activo: req.body.activo
    });
    const usuarioActualizado: Usuario[] = await actualizarRegistroPorID<Usuario>(id, nuevoUsuario, NameTables.Usuario);
    return res.status(200).json(usuarioActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un local de un usuario 
routerLocales.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const usuarioEliminado: Usuario[] = await borrarRegistroPorID<Usuario>(id, NameTables.Usuario);
    return res.status(200).json(usuarioEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});
*/
export default routerLocales;