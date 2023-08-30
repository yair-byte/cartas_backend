import { conectarBD } from '../database/database';
import { NameTables, Permission } from '../enums';
import { TypesInterfaces } from '../types';
import { obtenerPropiedadesSeparadasPorComas, obtenerDatosSeparadosPorComas } from '../utils';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';


// Middleware para verificar permisos
export const verificarPermisos = (permisoRequerido: Permission) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
      }
      if (!config.jwtSecret) {
        return res.status(500).json({ error: 'jwtSecret no está configurado.' });
      } else {
        const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
        if (permisoRequerido === Permission.Administrador) {
          if (String(payload.role) !== permisoRequerido) {
            return res.status(403).json({ error: 'No tiene los permisos necesarios como admin' });
          }
        } else {
          if (String(payload.role) !== permisoRequerido) {
            return res.status(403).json({ error: 'No tiene los permisos necesarios como usuario' });
          }
        }
        next();
      }
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    return undefined;
  };
};

export const obtenerTablaCompleta = async <T extends TypesInterfaces>(param: NameTables): Promise<T[]> => {
  try {
    const conn = await conectarBD();
    const querySQL = `SELECT * FROM ${param};`;
    const [rows] = await conn.query(querySQL);
    const result = rows as T[];
    return result;
  } catch (err) {
    throw err;
  }
};

export const obtenerRegistroPorID = async <T extends TypesInterfaces>(id: number, param: NameTables): Promise<T[]> => {
  try {
    const nameTableLC: string = param.toLowerCase();
    const conn = await conectarBD();
    const querySQL = `SELECT * FROM ${param} WHERE id_${nameTableLC} = ${id};`;
    const [rows] = await conn.query(querySQL);
    const result = rows as T[];
    return result;
  } catch (err) {
    throw err;
  }
};

export const guardarNuevoDato = async <T extends TypesInterfaces>(objNuevo: T, param: NameTables): Promise<T[]> => {
  try {
    const columnasTabla: string = obtenerPropiedadesSeparadasPorComas(objNuevo);
    const datosTabla: string = obtenerDatosSeparadosPorComas(objNuevo);
    const conn = await conectarBD();
    const querySQL = `INSERT INTO ${param} (${columnasTabla}) VALUES (${datosTabla});`;
    const [rows] = await conn.query(querySQL);
    const insertId = (rows as any)?.insertId;
    if (insertId !== undefined) {
      const datoInsertado: T[] = await obtenerRegistroPorID<T>(insertId, param);
      return datoInsertado;
    } else {
      throw new Error('Error al obtener el registro insertado.');
    }
  } catch (err) {
    throw err;
  }
};

export const obtenerRegistroCompleto = async <T extends TypesInterfaces>(dataColumn: any, column: keyof T, param: NameTables): Promise<T[]> => {
  try {
    const columnString = String(column);
    const conn = await conectarBD();
    const dataColumnToQuery = typeof dataColumn === 'string' ? `'${dataColumn}'` : dataColumn;
    const querySQL = `SELECT * FROM ${param} WHERE ${columnString} = ${dataColumnToQuery};`;
    console.log(querySQL)
    const [rows] = await conn.query(querySQL);
    const result = rows as T[];
    return result;
  } catch (err) {
    throw err;
  }
};

