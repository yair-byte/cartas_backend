import { TypesInterfaces, Usuario } from './types';

/* Verficacion de Tipos */
/*const isTINYINT1 = (value: number): boolean => {
  return value === 0 || value === 1;
};

const isBoolean = (value: boolean): boolean => {
  return typeof value === 'boolean';
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isNumber = (value: number): boolean => {
  return typeof value === 'number';
};

const isNull = (value: any): boolean => {
  return value === null;
};

const isTIME = (value: string): boolean => {
  return validador_TIME(value) //ej '18:00:00'
};
*/
const isString = (value: string): boolean => {
  return typeof value === 'string';
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

const parseString_o_NULL= (stringFromRequest: any): string | null => {
  if ((isString(stringFromRequest)) || (isNull(stringFromRequest))) {
    return stringFromRequest;
  }
  else{
    throw new Error('Tipo incorrecto, se esperaba un string o nulo');
  }
};

const parseBooleanTinyint1 = (booleanFromRequest: any): boolean => {
  if ((!isTINYINT1(booleanFromRequest)) || (!isBoolean(booleanFromRequest))) {
    throw new Error('Tipo incorrecto, se esperaba un boolean o tinyint(1)');
  }
  return booleanFromRequest;
};

const parseDate = (dateFromRequest: any): string => {
  if ((isNull(dateFromRequest)) || (!isString(dateFromRequest)) || (!isDate(dateFromRequest))) {
    throw new Error('Tipo incorrecto, se esperaba un Date');
  }
  return dateFromRequest;
};

const parseNumber = (numberFromRequest: any): number => {
  if (!isNumber(numberFromRequest)) {
    throw new Error('Tipo incorrecto, se esperaba un number');
  }
  return numberFromRequest;
};

const parseTIME = (TimeFromRequest: any): number => {
  if ((isNull(TimeFromRequest)) || (!isString(TimeFromRequest)) || (!isTIME(TimeFromRequest))) {
    throw new Error('Tipo incorrecto, se esperaba un TIME');
  }
  return TimeFromRequest;
};
*/
export const parseString= (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error('Tipo incorrecto, se esperaba un string');
  }
  return stringFromRequest;
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
export const crearNuevoUsuario = (object: any): Usuario => {
  const newUsuario: Usuario = {
    nombre_usuario: parseString(object.nombre_usuario),
    contrasenia: parseString(object.contrasenia),
    correo_electronico: parseString(object.correo_electronico),
    role: parseString(object.role)
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
