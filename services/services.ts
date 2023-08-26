import { conectarBD } from '../database/database'; 
import { NameTables } from '../enums';

export const obtenerTablaCompleta = async <T>(param: NameTables): Promise<T[]> => {
  try{
    const conn = await conectarBD();
    const [rows] = await conn.query(`SELECT * FROM ${param};`);
    const result = rows as T[];
    return result;
  }catch(err) { 
    throw err;
  }
};

export const obtenerRegistroID = async <T>(id: number, param: NameTables): Promise<T> => {
  try{
    const nameTableLC: string = param.toLowerCase(); 
    const conn = await conectarBD();
    const [rows] = await conn.query(`SELECT * FROM ${param} WHERE id_${nameTableLC} = ${id};`);
    const result = rows as T;
    return result;
  }catch(err) { 
    throw err;
  }
};