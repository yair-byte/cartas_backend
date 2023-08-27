import { Telefono } from './types';

/* Verficacion de Tipos */
const isTINYINT1 = (value: number): boolean => {
  return value === 0 || value === 1;
};

const isBoolean = (value: boolean): boolean => {
  return typeof value === 'boolean';
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isString = (value: string): boolean => {
  return typeof value === 'string';
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


/* Parsers */
const parseBooleanTinyint1 = (booleanFromRequest: any): boolean => {
  if ((!isTINYINT1(booleanFromRequest)) || (!isBoolean(booleanFromRequest))) {
    throw new Error('Incorrect or missing boolean value');
  }
  return booleanFromRequest;
};

const parseDate = (dateFromRequest: any): string => {
  if ((!isString(dateFromRequest)) || (!isDate(dateFromRequest))) {
    throw new Error('Incorrect or missing date value');
  }
  return dateFromRequest;
};

const parseNumber = (numberFromRequest: any): number => {
  if (!isNumber(numberFromRequest)) {
    throw new Error('Incorrect or missing number value');
  }
  return numberFromRequest;
};

const parseTIME = (TIMEFromRequest: any): number => {
  if ((!isString(TIMEFromRequest)) || (!isTIME(TIMEFromRequest))) {
    throw new Error('Incorrect or missing Time value');
  }
  return TIMEFromRequest;
};


/* Funciones varias */
// from Front-End -> Back-End -> BD
const validador_TIME = (value: string): boolean => {
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

const newTelefono = (object: any): Telefono => {
  const newTelefonito: Telefono = {
    id_telefono: parseNumber(object.id_telefono),
    nro_telefono: parseNumber(object.nro_telefono),
    id_local: parseNumber(object.id_local),
    es_principal: parseBooleanTinyint1(object.es_princiapl)
  };
  return newTelefonito;
};
