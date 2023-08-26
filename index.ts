import express from 'express';
import cors from 'cors';
import routerUsers from './routers/users_routes';

const app = express();
const PORT = 3000;
const BASE_URL = `http://localhost`;

// Middlewares
app.use(express.json());
app.use(cors());

//Rutas
app.get('/pingserver', (_req, res) => {
  console.log("hiciste ping al servidor!");
  res.send("pong");
});
app.use('/api/usuarios', routerUsers);
app.use('/api/usuarios/:id', routerUsers);

//start server
app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en ${BASE_URL}:${PORT} ...`);
});