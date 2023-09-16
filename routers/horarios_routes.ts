import express from 'express';
import { Request, Response } from 'express';
import { actualizarRegistroPorID, borrarRegistroPorID, guardarNuevoRegistro, obtenerRegistroPorColumna, verificarPermisos } from '../services/services';
import { NameTables, Permission } from '../enums';
import { Horario } from '../types';
import { crearNuevoHorario } from '../utils';

const routerHorarios = express.Router();

// Middlewares
routerHorarios.use(express.json());  //convierte JSON a Object JS

// Crear un nuevo Horario
routerHorarios.post('/nuevo', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const nuevoHorario: Horario = crearNuevoHorario({
      id_localcarta: req.body.id_localcarta,
      lunes_apertura: req.body.lunes_apertura,
      lunes_cierre: req.body.lunes_cierre,
      martes_apertura: req.body.martes_apertura,
      martes_cierre: req.body.martes_cierre,
      miercoles_apertura: req.body.miercoles_apertura,
      miercoles_cierre: req.body.miercoles_cierre,
      jueves_apertura: req.body.jueves_apertura,
      jueves_cierre: req.body.jueves_cierre,
      viernes_apertura: req.body.viernes_apertura,
      viernes_cierre: req.body.viernes_cierre,
      sabado_apertura: req.body.sabado_apertura,
      sabado_cierre: req.body.sabado_cierre,
      domingo_apertura: req.body.domingo_apertura,
      domingo_cierre: req.body.domingo_cierre
    });
    const registroInsertado: Horario[] = await guardarNuevoRegistro<Horario>(nuevoHorario, NameTables.Horario);
    return res.status(200).json(registroInsertado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// Obtener un horario por id
routerHorarios.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrHorarios: Horario[] = await obtenerRegistroPorColumna<Horario>(id, 'id_horario', NameTables.Horario);
    if (arrHorarios.length === 0) {
      return res.status(404).json({ error: 'No hay Horarios con ese ID!' });
    }
    return res.status(200).json(arrHorarios);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

//  actualizar datos de un Horario por ID
routerHorarios.put('/:id', verificarPermisos(Permission.Usuario), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const nuevoHorario: Horario = crearNuevoHorario({
      id_localcarta: req.body.id_localcarta,
      lunes_apertura: req.body.lunes_apertura,
      lunes_cierre: req.body.lunes_cierre,
      martes_apertura: req.body.martes_apertura,
      martes_cierre: req.body.martes_cierre,
      miercoles_apertura: req.body.miercoles_apertura,
      miercoles_cierre: req.body.miercoles_cierre,
      jueves_apertura: req.body.jueves_apertura,
      jueves_cierre: req.body.jueves_cierre,
      viernes_apertura: req.body.viernes_apertura,
      viernes_cierre: req.body.viernes_cierre,
      sabado_apertura: req.body.sabado_apertura,
      sabado_cierre: req.body.sabado_cierre,
      domingo_apertura: req.body.domingo_apertura,
      domingo_cierre: req.body.domingo_cierre
    });
    const HorarioActualizado: Horario[] = await actualizarRegistroPorID<Horario>(id, nuevoHorario, NameTables.Horario);
    return res.status(200).json(HorarioActualizado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

// borrar un horario por id
routerHorarios.delete('/:id', verificarPermisos(Permission.Administrador), async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const horarioEliminado: Horario[] = await borrarRegistroPorID<Horario>(id, NameTables.Horario);
    return res.status(200).json(horarioEliminado);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerHorarios;