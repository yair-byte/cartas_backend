import express from 'express';
import { Request, Response } from 'express';
import { obtenerTablaCompleta, guardarNuevoRegistro, obtenerRegistroPorColumna, obtenerRegistroPorID, actualizarRegistroPorID, verificarPermisos, borrarRegistroPorID } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Usuario } from '../types';
import { crearNuevoUsuario, parseString } from '../utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';

const routerUsuario = express.Router();

// Middlewares
routerUsuario.use(express.json());  //convierte JSON a Object JS

// Crear un usuario y almacenar su contraseña hasheada
routerUsuario.post('/nuevousuario', async (req: Request, res: Response) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.contrasenia, 10);
    const nuevoUsuario: Usuario = crearNuevoUsuario({
      nombre_usuario: req.body.nombre_usuario,
      contrasenia: passwordHash,
      correo_electronico: req.body.correo_electronico,
      role: req.body.role
    });
    const registroInsertado: Usuario[] = await guardarNuevoRegistro<Usuario>(nuevoUsuario, NameTables.Usuario);
    res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

// Iniciar sesión y verificar la contraseña hasheada
routerUsuario.post('/login', async (req: Request, res: Response) => {
  try {
    const usuarioAux = {
      nombre_usuario: parseString(req.body.nombre_usuario),
      contrasenia: parseString(req.body.contrasenia)
    };
    const arrUsuario = await obtenerRegistroPorColumna<Usuario>(usuarioAux.nombre_usuario, 'nombre_usuario', NameTables.Usuario);
    if (arrUsuario.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const usuario = arrUsuario[0];
    const passwordMatch = await bcrypt.compare(usuarioAux.contrasenia, usuario.contrasenia);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // Crear y devolver el token de acceso JWT
    if (config.jwtSecret) {
      const token = jwt.sign({ username: usuario.nombre_usuario, role: usuario.role }, config.jwtSecret);
      return res.json({ token });
    } else {
      // Manejar el caso en que config.jwtSecret es undefined
      return res.status(500).json({ error: 'jwtSecret no está configurado.' });
    }
  } catch (err) {
    const error: Error = err as Error;
    res.status(500).json({ error: error.message });
  }
  return undefined;
});

/* Obtener todos los Usuarios */
routerUsuario.get('/', async (_req: Request, res: Response) => {
  try {
    const usuarios: Usuario[] = await obtenerTablaCompleta<Usuario>(NameTables.Usuario);
    res.status(200).json(usuarios);
  } catch (err) {
    const error: Error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

/* Obtener usuario por ID */
routerUsuario.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const usuario: Usuario[] = await obtenerRegistroPorID<Usuario>(id, NameTables.Usuario);
    res.status(200).json(usuario);
  } catch (err) {
    const error: Error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

/* actualizar datos de un usuario */
routerUsuario.put('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const passwordHash = await bcrypt.hash(req.body.contrasenia, 10);
    const nuevoUsuario: Usuario = crearNuevoUsuario({
      nombre_usuario: req.body.nombre_usuario,
      contrasenia: passwordHash,
      correo_electronico: req.body.correo_electronico,
      role: req.body.role
    });
    const usuarioActualizado: Usuario[] = await actualizarRegistroPorID<Usuario>(id, nuevoUsuario, NameTables.Usuario);
    res.status(200).json(usuarioActualizado);
  } catch (err) {
    const error: Error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

/* borrar un usuario */
routerUsuario.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const usuarioEliminado: Usuario[] = await borrarRegistroPorID<Usuario>(id, NameTables.Usuario);
    res.status(200).json(usuarioEliminado);
  } catch (err) {
    const error: Error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

export default routerUsuario;