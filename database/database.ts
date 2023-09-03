import { Pool, createPool } from 'mysql2/promise';

export const conectarBD = async () => {
  const conexion: Pool = await createPool({
    host: 'localhost',
    user: 'root',
    password: 'Asdasd1#',
    database: 'cartas_bd',
    connectionLimit: 1,
  });
  return conexion;
};

export const cerrarConexionBD = async (pool: Pool | undefined) => {
  if (pool) {
    await pool.end();
  }
};