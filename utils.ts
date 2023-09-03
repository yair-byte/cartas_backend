import { LocalCarta, TypesInterfaces, Usuario } from './types';

/* Verficacion de Tipos */
/*

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isTIME = (value: string): boolean => {
  return validador_TIME(value) //ej '18:00:00'
};
*/
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
/*const parseBooleanTinyint1_o_NULL = (booleanFromRequest: any): boolean | null => {
  if ((isTINYINT1(booleanFromRequest)) || (isBoolean(booleanFromRequest)) || (isNull(booleanFromRequest))) {
    return booleanFromRequest;
  }
  else{
    throw new Error('Tipo incorrecto, se esperaba un boolean/tinyint(1) o nulo');
  }
};

const parseNumber_o_NULL = (numberFromRequest: any): number | null => {
  if ((isNumber(numberFromRequest)) || (isNull(numberFromRequest))) {
    return numberFromRequest;
  }
  else{
    throw new Error('Tipo incorrecto, se esperaba un number o nulo');
  }
};

const parseDate = (dateFromRequest: any): string => {
  if ((isNull(dateFromRequest)) || (!isString(dateFromRequest)) || (!isDate(dateFromRequest))) {
    throw new Error('Tipo incorrecto, se esperaba un Date');
  }
  return dateFromRequest;
};

const parseTIME = (TimeFromRequest: any): number => {
  if ((isNull(TimeFromRequest)) || (!isString(TimeFromRequest)) || (!isTIME(TimeFromRequest))) {
    throw new Error('Tipo incorrecto, se esperaba un TIME');
  }
  return TimeFromRequest;
};
*/

const parseString_o_NULL= (stringFromRequest: any): string | null => {
  if ((isString(stringFromRequest)) || (isNull(stringFromRequest))) {
    return stringFromRequest;
  }
  else{
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
  if ((isTINYINT1(booleanFromRequest)) || (isBoolean(booleanFromRequest))){
    return booleanFromRequest;
  }else{
    throw new Error('Tipo incorrecto, se esperaba un boolean o tinyint(1)');
  }
};

/* Funciones varias */
// from Front-End -> Back-End -> BD
/*const validador_TIME = (value: string): boolean => {
  if (value.length === 8 
      && typeof value.substring(0,1) === 'number' 
      && typeof value.substring(3,4) === 'number' 
      && typeof value.substring(6,7) === 'number' 
      && value.charAt(2) === ':'
      && value.charAt(5) === ':'){
        const hora: number = parseInt(value.substring(0,1));
        const minutos: number = parseInt(value.substring(3,4));
        const segundos: number = parseInt(value.substring(6,7));
        if (hora < 24 && minutos < 60 && segundos < 60){
          return true;
        }
  }
  return false;
};
*/
export const crearNuevolocalCarta = (object: any): LocalCarta => {
  const newLocalCarta: LocalCarta = {
    id_usuario: parseNumber(object.id_usuario),
    nombre_local: parseString(object.nombre_local),
    descripcion_local: parseString(object.descripcion_local),
    nombre_carta: parseString(object.nombre_carta),
    descripcion_carta: parseString(object.descripcion_carta),
    cdi: parseString(object.cdi),
    calle: parseString(object.calle),
    altura: parseNumber(object.altura),
    piso: parseString_o_NULL(object.piso),
    activo: parseBooleanTinyint1(object.activo),
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

/*export const obtenerListaIDs = (arrObj: TypesInterfaces[], tabla: NameTables): number[] => {
  const nameTableLC: string = tabla.toLowerCase();
  const arrIDsStr: string[]= arrObj.map(obj => `${obj}.id_${nameTableLC}`);
  const arrIDsEnteros: number[] = arrIDsStr.map(idStr => parseInt(idStr, 10));
  return arrIDsEnteros;
};*/