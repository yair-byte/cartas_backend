import express from 'express';
import cors from 'cors';
import config from './config';
import helmet from 'helmet';
import routerUsers from './routers/users_routes';
import routerLocales from './routers/locales_routes';
import routerMenus from './routers/menus_routes';
import routerPedidos from './routers/pedidos_routes';
import routerHorarios from './routers/horarios_routes';
import routerTelefonos from './routers/telefonos_routes';
import routerTipoPago from './routers/tipoPago_routes';
import routerTipoEntrega from './routers/tipoEntrega_routes';
import routerTipoPlato from './routers/tipoPlato_routes';
import routerSecciones from './routers/secciones_routes';
import routerLocalSeccion from './routers/localSeccion_routes';
import routerLocalTipoPago from './routers/localTipoPago_routes';
import routerLocalTipoEntrega from './routers/localTipoEntrega_routes';
import routerSeccionTipoPlato from './routers/seccionTipoPlato_routes';
import routerComidas from './routers/comidas_routes';
import routerPedidosDetalles from './routers/pedidos_detalles_routes';

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
app.use('/api/secciones/', routerSecciones);
app.use('/api/comidas/', routerComidas);
app.use('/api/pedidos/', routerPedidos);
app.use('/api/pedidosdetalles/', routerPedidosDetalles);
app.use('/api/horarios/', routerHorarios);
app.use('/api/telefonos/', routerTelefonos);
app.use('/api/tipospago/', routerTipoPago);
app.use('/api/tiposentrega/', routerTipoEntrega);
app.use('/api/tipoplato/', routerTipoPlato);
app.use('/api/localsecciones/', routerLocalSeccion);
app.use('/api/localtipospago/', routerLocalTipoPago);
app.use('/api/localtiposentrega/', routerLocalTipoEntrega);
app.use('/api/secciontipoplato', routerSeccionTipoPlato);


//start server
app.listen(config.PORT, () => {
  console.log(`El servidor esta escuchando en ${config.BASE_URL}:${config.PORT} ...`);
});