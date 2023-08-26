export interface Usuario {
  id_usuario: number;
  nombre_usuario: string;
  contrasenia: string;
  correo_electronico: string;
};

export interface Seccion {
  id_seccion: number;
  nombre_seccion: string;
};

export interface LocalCarta {
  id_localcarta: number;
  id_usuario: number;
  nombre_local: string;
  descripcion_local: string;
  nombre_carta: string;
  descripcion_carta: string;
  cdi: string;
  calle: string;
  altura: number;
  piso: string | null;
  activo: boolean;
};

export interface Telefono {
  id_telefono: number;
  nro_telefono: number;
  id_local: number;
  es_principal: boolean;
};

export interface TipoPlato {
  id_tipoplato: number;
  nombre_tipoplato: string;
  descripcion_tipoplato: string;
};

export interface Tamanio {
  id_tamanio: number;
  tamanio: string;
};

export interface Comida {
  id_comida: number;
  nombre_comida: string;
  ingredientes: string;
};

export interface Pedido {
  id_pedido: number;
  id_localcarta: number;
  nombre_cliente: string;
  fecha_pedido: Date;
};

export interface Comida_Tamanio {
  id_comida_tamanio: number;
  id_comida: number;
  id_tamanio: number;
  precio_unidad: number;
  disponible: boolean;
  oferta: boolean | null;
};

export interface Comida_Pedido {
  id_comida_pedido: number;
  id_comida: number;
  id_pedido: number;
  cantidad_unidades: number;
};

export interface TipoPlato_Tamanio {
  id_tipoplato_tamanio: number;
  id_tipoplato: number;
  id_tamanio: number;
};

export interface Seccion_TipoPlato {
  id_seccion_tipoplato: number;
  id_tipoplato: number;
  id_seccion: number;
};

export interface LocalCarta_Seccion {
  id_localcarta_seccion: number;
  id_localcarta: number;
  id_seccion: number;
};

