import express from 'express';
import { Request , Response } from 'express';
import { obtenerTablaCompleta , obtenerRegistroID } from '../services/services';
import { NameTables } from '../enums';
import { Usuario } from '../types';

const routerUsuario = express.Router();

// Middlewares
routerUsuario.use(express.json());  //convierte JSON a Object JS

/* Obtener todos los Usuarios */
routerUsuario.get('/', async (_req: Request, res: Response) => {
  try {
    const usuarios: Usuario[] = await obtenerTablaCompleta<Usuario>(NameTables.Usuario);
    res.status(200).json(usuarios);
  }catch(err){
    res.status(500).json(err);
  }
});

/* Obtener usuario por ID */
routerUsuario.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10); 
    const usuario: Usuario = await obtenerRegistroID<Usuario>(id, NameTables.Usuario);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default routerUsuario;