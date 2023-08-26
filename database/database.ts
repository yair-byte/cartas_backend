import { Pool, createPool } from 'mysql2/promise';

export const conectarBD = async () => {
  const conexion: Pool = await createPool({
    host: 'localhost',
    user: 'root',
    password: 'Asdasd1#',
    database: 'cartas_bd',
    connectionLimit: 10,
  });
  return conexion;
};