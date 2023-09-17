import { Pool, createPool } from 'mysql2/promise';
import config from '../config';

export const conectarBD = async () => {
  const conexion: Pool = await createPool({
    host: config.HOST_DB,
    user: config.USER_DB,
    password: config.PASSWORD_DB,
    database: config.DATABASE_NAME,
    connectionLimit: 1,
  });
  return conexion;
};

export const cerrarConexionBD = async (pool: Pool | undefined) => {
  if (pool) {
    await pool.end();
  }
};