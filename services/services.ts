import { conectarBD, cerrarConexionBD } from '../database/database';
import { NameTables, Permission } from '../enums';
import { TypesInterfaces } from '../types';
import { obtenerPropiedadesSeparadasPorComas, obtenerDatosSeparadosPorComas, obtenerParKeyValorSeparadosPorComas } from '../utils';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { Pool } from 'mysql2/promise';

// Middleware para verificar permisos
// si se requiere solo permisos de user y el token es admin, se le da paso
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
        } else {  //user
          if (!(String(payload.role) === Permission.Administrador || String(payload.role) === Permission.Usuario)) {
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

export const obtenerTablaCompleta = async <T extends TypesInterfaces>(tabla: NameTables): Promise<T[]> => {
  let conn: Pool | undefined;
  try {
    conn = await conectarBD();
    const querySQL = `SELECT * FROM ${tabla};`;
    const [rows] = await conn.query(querySQL);
    const result = rows as T[];
    return result;
  } catch (err) {
    throw err;
  } finally {
    await cerrarConexionBD(conn);
  }
};

export const obtenerRegistroPorID = async <T extends TypesInterfaces>(id: number, tabla: NameTables): Promise<T[]> => {
  let conn: Pool | undefined;
  try {
    const nameTableLC: string = tabla.toLowerCase();
    conn = await conectarBD();
    const idEscapado = conn.escape(id);
    const querySQL = `SELECT * FROM ${tabla} WHERE id_${nameTableLC} = ${idEscapado};`;
    const [rows] = await conn.query(querySQL);
    if (Array.isArray(rows) && rows.length === 1) {
      const result = rows as T[];
      return result;
    } else {
      throw new Error('Error al obtener el registro con el ID');
    }
  } catch (err) {
    throw err;
  } finally {
    await cerrarConexionBD(conn);
  }
};

export const obtenerRegistroPorColumna = async <T extends TypesInterfaces>(dataColumn: any, column: keyof T, tabla: NameTables): Promise<T[]> => {
  let conn: Pool | undefined;
  try {
    const columnString = String(column);
    conn = await conectarBD();
    const dataColumnToQuery = typeof dataColumn === 'string' ? `'${dataColumn}'` : dataColumn;
    const querySQL = `SELECT * FROM ${tabla} WHERE ${columnString} = ${dataColumnToQuery};`;
    const [rows] = await conn.query(querySQL);
    if (Array.isArray(rows) && rows.length > 0) {
      const result = rows as T[];
      return result;
    } else {
      throw new Error('Error al obtener el registro por columna');
    }
  } catch (err) {
    throw err;
  } finally {
    await cerrarConexionBD(conn);
  }
};

export const obtenerRegistroPorDosColumna = async <T extends TypesInterfaces>(dataColumn1: any, dataColumn2: any, column1: keyof T, column2: keyof T, tabla: NameTables): Promise<T[]> => {
  let conn: Pool | undefined;
  try {
    const columnString1 = String(column1);
    const columnString2 = String(column2);
    conn = await conectarBD();
    const dataColumn1ToQuery = typeof dataColumn1 === 'string' ? `'${dataColumn1}'` : dataColumn1;
    const dataColumn2ToQuery = typeof dataColumn2 === 'string' ? `'${dataColumn2}'` : dataColumn2;
    const querySQL = `SELECT * FROM ${tabla} WHERE ${columnString1} = ${dataColumn1ToQuery} AND ${columnString2} = ${dataColumn2ToQuery};`;
    const [rows] = await conn.query(querySQL);
    if (Array.isArray(rows) && rows.length > 0) {
      const result = rows as T[];
      return result;
    } else {
      throw new Error('Error al obtener el registro por dos columnas');
    }
  } catch (err) {
    throw err;
  } finally {
    await cerrarConexionBD(conn);
  }
};

export const guardarNuevoRegistro = async <T extends TypesInterfaces>(objNuevo: T, tabla: NameTables): Promise<T[]> => {
  let conn: Pool | undefined;
  try {
    const columnasTabla: string = obtenerPropiedadesSeparadasPorComas(objNuevo);
    const datosTabla: string = obtenerDatosSeparadosPorComas(objNuevo);
    conn = await conectarBD();
    try {
      await conn.query('START TRANSACTION');
      const querySQL = `INSERT INTO ${tabla} (${columnasTabla}) VALUES (${datosTabla});`;
      const [rows] = await conn.query(querySQL);
      const insertId = (rows as any)?.insertId;
      if (insertId !== undefined) {
        await conn.query('COMMIT');
        const datoInsertado: T[] = await obtenerRegistroPorID<T>(insertId, tabla);
        return datoInsertado;
      } else {
        await conn.query('ROLLBACK');
        throw new Error('Error al obtener el registro insertado.');
      }
    } catch (err) {
      await conn.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    throw err;
  } finally {
    await cerrarConexionBD(conn);
  }
};

export const actualizarRegistroPorID = async <T extends TypesInterfaces>(id: number, objNuevo: T, tabla: NameTables): Promise<T[]> => {
  let conn: Pool | undefined;
  try {
    const parColumnaValor: string = obtenerParKeyValorSeparadosPorComas(objNuevo);
    const nameTableLC: string = tabla.toLowerCase();
    conn = await conectarBD();
    try {
      await conn.query('START TRANSACTION');
      const idEscapado = conn.escape(id);
      const querySQL = `UPDATE ${tabla} SET ${parColumnaValor} WHERE id_${nameTableLC} = ${idEscapado};`;
      const [rows] = await conn.query(querySQL);
      const columnasAfectadas = (rows as any)?.affectedRows;
      if (columnasAfectadas !== undefined && columnasAfectadas > 0) {
        await conn.query('COMMIT');
        const datoInsertado: T[] = await obtenerRegistroPorID<T>(id, tabla);
        return datoInsertado;
      } else {
        await conn.query('ROLLBACK');
        throw new Error('Error al actualizar el registro.');
      }
    } catch (err) {
      await conn.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    throw err;
  } finally {
    await cerrarConexionBD(conn);
  }
};

export const borrarRegistroPorID = async <T extends TypesInterfaces>(id: number, tabla: NameTables): Promise<T[]> => {
  let conn: Pool | undefined;
  try {
    const nameTableLC: string = tabla.toLowerCase();
    conn = await conectarBD();
    try {
      await conn.query('START TRANSACTION');
      const idEscapado = conn.escape(id);
      const querySQL = `SELECT * FROM ${tabla} WHERE id_${nameTableLC} = ${idEscapado};`;
      const [rows] = await conn.query(querySQL);
      if (Array.isArray(rows) && rows.length > 0) {
        const querySQL2 = `DELETE FROM ${tabla} WHERE id_${nameTableLC} = ${idEscapado};`;
        const [rows2] = await conn.query(querySQL2);
        const columnasAfectadas = (rows2 as any)?.affectedRows;
        if (columnasAfectadas !== undefined && columnasAfectadas > 0) {
          const result = rows as T[];
          await conn.query('COMMIT');
          return result;
        } else {
          await conn.query('ROLLBACK');
          throw new Error('Error al borrar el registro.');
        }
      } else {
        await conn.query('ROLLBACK');
        throw new Error('Error al borrar el registro, no se encontró ese ID');
      }
    } catch (err) {
      await conn.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    throw err;
  } finally {
    await cerrarConexionBD(conn);
  }
};

