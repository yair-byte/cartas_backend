import express from 'express';
import cors from 'cors';
import routerUsers from './routers/users_routes';
import config from './config';

const app = express();

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
app.use('/api/usuarios/login', routerUsers);
app.use('/api/usuarios/nuevousuario', routerUsers);

//start server
app.listen(config.PORT, () => {
  console.log(`El servidor esta escuchando en ${config.BASE_URL}:${config.PORT} ...`);
});