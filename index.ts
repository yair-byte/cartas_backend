import express from 'express';
import cors from 'cors';
import routerUsers from './routers/users_routes';
import config from './config';
import helmet from 'helmet';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

//Rutas
app.get('/alive', (_req, res) => {
  res.send("Servidor Activo!!");
});
app.use('/api/usuarios/', routerUsers);
app.use('/api/usuarios/:id', routerUsers);
app.use('/api/usuarios/login', routerUsers);
app.use('/api/usuarios/nuevo', routerUsers);

//start server
app.listen(config.PORT, () => {
  console.log(`El servidor esta escuchando en ${config.BASE_URL}:${config.PORT} ...`);
});