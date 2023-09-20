import express from 'express';
import { Request, Response } from 'express';
import { NameTables } from '../enums';
import { CartaCompleta, Comida, Horario, LocalCarta, LocalCarta_Seccion, LocalCarta_TipoEntrega, LocalCarta_TipoPago, Seccion, Seccion_TipoPlato, Telefono, TipoEntrega, TipoPago, TipoPlato } from '../types';
import { obtenerRegistroPorColumna, obtenerRegistroPorID } from '../services/services';

const routerMenus = express.Router();

// Middlewares
routerMenus.use(express.json());  //convierte JSON a Object JS

// Obtener el MENU completo con el id del LocalCarta
routerMenus.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const arrLocales: LocalCarta[] = await obtenerRegistroPorID<LocalCarta>(id, NameTables.LocalCarta);
    if (arrLocales.length === 0) {
      return res.status(404).json({ error: 'No se encontró el Local con ese ID!' });
    }
    const arrTelefonos: Telefono[] = await obtenerRegistroPorColumna<Telefono>(id, 'id_localcarta', NameTables.Telefono);
    if (arrTelefonos.length === 0) {
      return res.status(404).json({ error: 'El local no tiene telefonos asignados!' });
    }
    const arrHorarios: Horario[] = await obtenerRegistroPorColumna<Horario>(id, 'id_localcarta', NameTables.Horario);
    if (arrHorarios.length === 0) {
      return res.status(404).json({ error: 'El local no tiene Horario asignado!' });
    }
    const arrTiposPago: LocalCarta_TipoPago[] = await obtenerRegistroPorColumna<LocalCarta_TipoPago>(id, 'id_localcarta', NameTables.LocalCarta_TipoPago);
    if (arrTiposPago.length === 0) {
      return res.status(404).json({ error: 'El local no tiene Tipos de Pago asignados!' });
    }
    const arrTiposEntrega: LocalCarta_TipoEntrega[] = await obtenerRegistroPorColumna<LocalCarta_TipoEntrega>(id, 'id_localcarta', NameTables.LocalCarta_TipoEntrega);
    if (arrTiposEntrega.length === 0) {
      return res.status(404).json({ error: 'El local no tiene Tipos de Entrega asignados!' });
    }
    const arrTipoPagoID: number[] = arrTiposPago.map((tipoPago) => tipoPago.id_tipopago);
    let arrPagos: TipoPago[] = [];
    await Promise.all(arrTipoPagoID.map(async (idTipoPago) => {
      const pagos: TipoPago[] = await obtenerRegistroPorColumna<TipoPago>(idTipoPago, 'id_tipopago', NameTables.TipoPago);
      if (pagos.length > 0) {
        arrPagos.push(pagos[0]);
      }
    }));
    if (arrPagos.length === 0 || arrPagos.length !== arrTipoPagoID.length) {
      return res.status(404).json({ error: 'Tipos de Pagos no encontrados en la BD!' });
    }
    const arrTipoEntregaID: number[] = arrTiposEntrega.map((tipoEntrega) => tipoEntrega.id_tipoentrega);
    let arrEntregas: TipoEntrega[] = [];
    await Promise.all(arrTipoEntregaID.map(async (idTipoEntrega) => {
      const entregas: TipoEntrega[] = await obtenerRegistroPorColumna<TipoEntrega>(idTipoEntrega, 'id_tipoentrega', NameTables.TipoEntrega);
      if (entregas.length > 0) {
        arrEntregas.push(entregas[0]);
      }
    }));
    if (arrEntregas.length === 0 || arrEntregas.length !== arrTipoEntregaID.length) {
      return res.status(404).json({ error: 'Tipos de Entregas no encontradas en la BD!' });
    }
    const arrLocalSecciones: LocalCarta_Seccion[] = await obtenerRegistroPorColumna<LocalCarta_Seccion>(id, 'id_localcarta', NameTables.LocalCarta_Seccion);
    if (arrLocalSecciones.length === 0) {
      return res.status(404).json({ error: 'El local no tiene Secciones aun!' });
    }
    const arrSeccionesID: number[] = arrLocalSecciones.map((seccion) => seccion.id_seccion);
    let arrSecciones: Seccion[] = [];
    await Promise.all(arrSeccionesID.map(async (idSeccion) => {
      const secciones: Seccion[] = await obtenerRegistroPorColumna<Seccion>(idSeccion, 'id_seccion', NameTables.Seccion);
      if (secciones.length > 0) {
        arrSecciones.push(secciones[0]);
      }
    }));
    if (arrSecciones.length === 0 || arrSecciones.length !== arrSeccionesID.length) {
      return res.status(404).json({ error: 'Secciones no encontradas en la BD!' });
    }
    // busacar para cada seccion (con el id de la seccion) los tipos de platos ofrecidos
    let arrSeccionTipoPlato: Seccion_TipoPlato[] = [];
    await Promise.all(arrSeccionesID.map(async (idSeccion) => {
      const seccionTipoPlato: Seccion_TipoPlato[] = await obtenerRegistroPorColumna<Seccion_TipoPlato>(idSeccion, 'id_seccion', NameTables.Seccion_TipoPlato);
      // mas de un registro que cumple la condicion
      seccionTipoPlato.forEach((valueSTP) => {
        arrSeccionTipoPlato.push(valueSTP);
      });
    }));
    if (arrSeccionTipoPlato.length === 0) {
      return res.status(404).json({ error: 'No hay Tipos de Platos ofrecidos para una Seccion!' });
    }
    const arrTipoPlatoID: number[] = arrSeccionTipoPlato.map((tipoPlato) => tipoPlato.id_tipoplato);
    let arrTiposPlato: TipoPlato[] = [];
    await Promise.all(arrTipoPlatoID.map(async (idTipoPlato) => {
      const tiposplatos: TipoPlato[] = await obtenerRegistroPorColumna<TipoPlato>(idTipoPlato, 'id_tipoplato', NameTables.TipoPlato);
      if (tiposplatos.length > 0) {
        arrTiposPlato.push(tiposplatos[0]);
      }
    }));
    if (arrTiposPlato.length === 0 || arrTiposPlato.length !== arrTipoPlatoID.length) {
      return res.status(404).json({ error: 'Tipos de Platos no encontrados en la BD!' });
    }
    // buscar para cada tipo de plato sus comidas ofrecidas
    let arrComidas: Comida[] = [];
    await Promise.all(arrTipoPlatoID.map(async (idTipoPlato) => {
      const comidas: Comida[] = await obtenerRegistroPorColumna<Comida>(idTipoPlato, 'id_tipoplato', NameTables.Comida);
      // mas de un registro que cumple la condicion
      comidas.forEach((valueC) => {
        arrComidas.push(valueC);
      });
    }));
    if (arrComidas.length === 0) {
      return res.status(404).json({ error: 'No hay Comidas ofrecidas para un Tipo de Plato!' });
    }

    // Armar objeto a enviar
    const dataCartaCompleta: CartaCompleta = {
      localCarta: arrLocales[0],
      telefonos: arrTelefonos,
      horarios: arrHorarios[0],
      tiposPago: arrPagos,
      tiposEntrega: arrEntregas,
      secciones: arrSecciones.map((seccion) => {
        const tiposPlato = arrSeccionTipoPlato
          .filter((stp) => stp.id_seccion === seccion.id_seccion)
          .map((stp) => {
            const tipoPlato = arrTiposPlato.find((tp) => tp.id_tipoplato === stp.id_tipoplato) as TipoPlato;
            const comidas = arrComidas
              .filter((comida) => comida.id_tipoplato === tipoPlato.id_tipoplato)
              .map((comida) => {
                return {
                  id_comida: comida.id_comida,
                  nombre_comida: comida.nombre_comida,
                  ingredientes: comida.ingredientes,
                  precio_unidad: comida.precio_unidad,
                  disponible: comida.disponible
                };
              });
            return {
              id_tipoplato: tipoPlato.id_tipoplato,
              nombre_tipoplato: tipoPlato.nombre_tipoplato,
              comidas,
            };
          });
        return {
          id_seccion: seccion.id_seccion,
          nombre_seccion: seccion.nombre_seccion,
          tiposPlato,
        };
      }),
    };

    return res.status(200).json(dataCartaCompleta);
  } catch (err) {
    const error: Error = err as Error;
    return res.status(500).json({ error: error.message });
  }
});

export default routerMenus;