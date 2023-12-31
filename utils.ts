import { Comida, Horario, LocalCarta, LocalCarta_Seccion, LocalCarta_TipoEntrega, LocalCarta_TipoPago, Pedido, Pedido_Detalle, Seccion, Seccion_TipoPlato, Telefono, TipoEntrega, TipoPago, TipoPlato, TypesInterfaces, Usuario } from './types';

/* Verficacion de Tipos */
const isTIME = (value: string): boolean => {
  return validador_TIME(value) //ej '18:00:00'
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isNull = (value: any): boolean => {
  return value === null;
};

const isNumber = (value: number): boolean => {
  return typeof value === 'number';
};

const isString = (value: string): boolean => {
  return typeof value === 'string';
};

const isBoolean = (value: boolean): boolean => {
  return typeof value === 'boolean';
};

const isTINYINT1 = (value: number): boolean => {
  return value === 0 || value === 1;
};


/* Parsers */
const parseTIME_o_NULL = (TimeFromRequest: any): string | null => {
  if ((isNull(TimeFromRequest)) || (isString(TimeFromRequest)) || (isTIME(TimeFromRequest))) {
    return TimeFromRequest;
  }
  else {
    throw new Error('Tipo incorrecto, se esperaba un TIME o NULL');
  }
};

const parseNumber_o_NULL = (numberFromRequest: any): number | null => {
  if ((isNumber(numberFromRequest)) || (isNull(numberFromRequest))) {
    return numberFromRequest;
  }
  else {
    throw new Error('Tipo incorrecto, se esperaba un number o nulo');
  }
};

const parseDate = (dateFromRequest: any): Date => {
  if ((isNull(dateFromRequest)) || (!isString(dateFromRequest)) || (!isDate(dateFromRequest))) {
    throw new Error('Tipo incorrecto, se esperaba un Date');
  }
  return new Date(dateFromRequest);
};

const parseString_o_NULL = (stringFromRequest: any): string | null => {
  if ((isString(stringFromRequest)) || (isNull(stringFromRequest))) {
    return stringFromRequest;
  }
  else {
    throw new Error('Tipo incorrecto, se esperaba un string o nulo');
  }
};

const parseNumber = (numberFromRequest: any): number => {
  if (!isNumber(numberFromRequest)) {
    throw new Error('Tipo incorrecto, se esperaba un number');
  }
  return numberFromRequest;
};

export const parseString = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error('Tipo incorrecto, se esperaba un string');
  }
  return stringFromRequest;
};

const parseBooleanTinyint1 = (booleanFromRequest: any): boolean => {
  if ((isTINYINT1(booleanFromRequest)) || (isBoolean(booleanFromRequest))) {
    return booleanFromRequest;
  } else {
    throw new Error('Tipo incorrecto, se esperaba un boolean o tinyint(1)');
  }
};

/* Funciones varias */
// from Front-End -> Back-End -> BD
const validador_TIME = (value: string): boolean => {
  if (value.length === 8
    && typeof value.substring(0, 1) === 'number'
    && typeof value.substring(3, 4) === 'number'
    && typeof value.substring(6, 7) === 'number'
    && value.charAt(2) === ':'
    && value.charAt(5) === ':') {
    const hora: number = parseInt(value.substring(0, 1));
    const minutos: number = parseInt(value.substring(3, 4));
    const segundos: number = parseInt(value.substring(6, 7));
    if (hora < 24 && minutos < 60 && segundos < 60) {
      return true;
    }
  }
  return false;
};

export const crearNuevoPedidoDetalle = (object: any): Pedido_Detalle => {
  const newPedido: Pedido_Detalle = {
    id_pedido: parseNumber(object.id_pedido),
    comida_descripcion: parseString(object.comida_descripcion),
    precio_unidad: parseNumber(object.precio_unidad),
    cantidad_unidades: parseNumber(object.cantidad_unidades)
  };
  return newPedido;
};

export const crearNuevaComida = (object: any): Comida => {
  const newComida: Comida = {
    id_tipoplato: parseNumber(object.id_tipoplato),
    nombre_comida: parseString(object.nombre_comida),
    ingredientes: parseString(object.ingredientes),
    precio_unidad: parseNumber(object.precio_unidad),
    disponible: parseBooleanTinyint1(object.disponible),
    url_imagen: parseString_o_NULL(object.url_imagen)
  };
  return newComida;
};

export const crearNuevaSeccionTipoPlato = (object: any): Seccion_TipoPlato => {
  const newSeccion_TipoPlato: Seccion_TipoPlato = {
    id_seccion: parseNumber(object.id_seccion),
    id_tipoplato: parseNumber(object.id_tipoplato)
  };
  return newSeccion_TipoPlato;
};

export const crearNuevoTipoPlato = (object: any): TipoPlato => {
  const newTipoPlato: TipoPlato = {
    nombre_tipoplato: parseString(object.nombre_tipoplato),
    descripcion_tipoplato: parseString(object.descripcion_tipoplato)
  };
  return newTipoPlato;
};

export const crearNuevaSeccion = (object: any): Seccion => {
  const newSeccion: Seccion = {
    nombre_seccion: parseString(object.nombre_seccion)
  };
  return newSeccion;
};

export const crearNuevoLocalCartaSeccion = (object: any): LocalCarta_Seccion => {
  const newLocaLocalCarta_Seccion: LocalCarta_Seccion = {
    id_localcarta: parseNumber(object.id_localcarta),
    id_seccion: parseNumber(object.id_seccion)
  };
  return newLocaLocalCarta_Seccion;
};

export const crearNuevoLocalCartaTipoEntrega = (object: any): LocalCarta_TipoEntrega => {
  const newLocalCartaTipoEntrega: LocalCarta_TipoEntrega = {
    id_localcarta: parseNumber(object.id_localcarta),
    id_tipoentrega: parseNumber(object.id_tipoentrega)
  };
  return newLocalCartaTipoEntrega;
};

export const crearNuevoLocalCartaTipoPago = (object: any): LocalCarta_TipoPago => {
  const newLocalCartaTipoPago: LocalCarta_TipoPago = {
    id_localcarta: parseNumber(object.id_localcarta),
    id_tipopago: parseNumber(object.id_tipopago)
  };
  return newLocalCartaTipoPago;
};

export const crearNuevoTipoEntrega = (object: any): TipoEntrega => {
  const newTipoEntrega: TipoEntrega = {
    descripcion_tipoentrega: parseString(object.descripcion_tipoentrega)
  };
  return newTipoEntrega;
};

export const crearNuevoTipoPago = (object: any): TipoPago => {
  const newTipoPago: TipoPago = {
    descripcion_tipopago: parseString(object.descripcion_tipopago)
  };
  return newTipoPago;
};

export const crearNuevoTelefono = (object: any): Telefono => {
  const newTelefono: Telefono = {
    nro_telefono: parseNumber(object.nro_telefono),
    id_localcarta: parseNumber(object.id_localcarta),
    es_principal: parseBooleanTinyint1(object.es_principal),
  };
  return newTelefono;
};

export const crearNuevoHorario = (object: any): Horario => {
  const newHorario: Horario = {
    id_localcarta: parseNumber(object.id_localcarta),
    lunes_apertura: parseTIME_o_NULL(object.lunes_apertura),
    lunes_cierre: parseTIME_o_NULL(object.lunes_cierre),
    martes_apertura: parseTIME_o_NULL(object.martes_apertura),
    martes_cierre: parseTIME_o_NULL(object.martes_cierre),
    miercoles_apertura: parseTIME_o_NULL(object.miercoles_apertura),
    miercoles_cierre: parseTIME_o_NULL(object.miercoles_cierre),
    jueves_apertura: parseTIME_o_NULL(object.jueves_apertura),
    jueves_cierre: parseTIME_o_NULL(object.jueves_cierre),
    viernes_apertura: parseTIME_o_NULL(object.viernes_apertura),
    viernes_cierre: parseTIME_o_NULL(object.viernes_cierre),
    sabado_apertura: parseTIME_o_NULL(object.sabado_apertura),
    sabado_cierre: parseTIME_o_NULL(object.sabado_cierre),
    domingo_apertura: parseTIME_o_NULL(object.domingo_apertura),
    domingo_cierre: parseTIME_o_NULL(object.domingo_cierre)
  };
  return newHorario;
};

export const crearNuevoPedido = (object: any): Pedido => {
  const newLocalCarta: Pedido = {
    id_localcarta: parseNumber(object.id_localcarta),
    nombre_cliente: parseString(object.nombre_cliente),
    fecha_pedido: parseDate(object.fecha_pedido),
    direccion_cliente: parseString_o_NULL(object.direccion_cliente),
    nro_mesa: parseNumber_o_NULL(object.nro_mesa),
    precio_total: parseNumber(object.precio_total),
  };
  return newLocalCarta;
};

export const crearNuevolocalCarta = (object: any): LocalCarta => {
  const newLocalCarta: LocalCarta = {
    id_usuario: parseNumber(object.id_usuario),
    nombre_local: parseString(object.nombre_local),
    descripcion_local: parseString(object.descripcion_local),
    nombre_carta: parseString(object.nombre_carta),
    descripcion_carta: parseString(object.descripcion_carta),
    url_logo: parseString_o_NULL(object.url_logo),
    calle: parseString(object.calle),
    altura: parseNumber(object.altura),
    piso: parseString_o_NULL(object.piso)
  };
  return newLocalCarta;
};

export const crearNuevoUsuario = (object: any): Usuario => {
  const newUsuario: Usuario = {
    nombre_usuario: parseString(object.nombre_usuario),
    contrasenia: parseString(object.contrasenia),
    correo_electronico: parseString(object.correo_electronico),
    role: parseString(object.role),
    activo: parseBooleanTinyint1(object.activo)
  };
  return newUsuario;
};

export const obtenerPropiedadesSeparadasPorComas = (obj: TypesInterfaces): string => {
  const propiedades = Object.keys(obj);
  return propiedades.join(', ');
};

export const obtenerDatosSeparadosPorComas = (obj: TypesInterfaces): string => {
  const valores = Object.values(obj);
  const stringValores = valores.map(valor => isString(valor) ? `'${valor}'` : `${valor}`).join(', ');
  return stringValores;
};

export const obtenerParKeyValorSeparadosPorComas = (obj: TypesInterfaces): string => {
  const propiedades = Object.keys(obj);
  const valores = Object.values(obj);
  const stringParKeyValor = propiedades.map((key, indexKey) => isString(valores[indexKey]) ? `${key} = '${valores[indexKey]}'` : `${key} = ${valores[indexKey]}`).join(', ');
  return stringParKeyValor;
};
