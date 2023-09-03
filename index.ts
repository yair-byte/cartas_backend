import express from 'express';
import cors from 'cors';
import routerUsers from './routers/users_routes';
import config from './config';
import helmet from 'helmet';
import routerLocales from './routers/locales_routes';
import routerMenus from './routers/menus_routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

//Rutas
app.get('/alive', (_req, res) => {
  res.send("Servidor Activo!!");
});
app.use('/api/locales/', routerLocales);
app.use('/api/usuarios/', routerUsers);
app.use('/api/menus/', routerMenus);

//start server
app.listen(config.PORT, () => {
  console.log(`El servidor esta escuchando en ${config.BASE_URL}:${config.PORT} ...`);
});