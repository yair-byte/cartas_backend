export type TypesInterfaces = Usuario 
                            | Seccion 
                            | LocalCarta 
                            | Telefono 
                            | TipoPlato 
                            | Tamanio 
                            | Comida 
                            | Pedido 
                            | Comida_Tamanio 
                            | Comida_Tamanio_Pedido 
                            | Seccion_TipoPlato 
                            | LocalCarta_Seccion 
                            | Horario 
                            | TipoPago 
                            | TipoEntrega 
                            | LocalCarta_TipoPago 
                            | LocalCarta_TipoEntrega;

export interface Usuario {
  id_usuario?: number;
  nombre_usuario: string;
  contrasenia: string;
  correo_electronico: string;
  role: string;
};

export interface Seccion {
  id_seccion?: number;
  nombre_seccion: string;
};

export interface LocalCarta {
  id_localcarta?: number;
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
  id_telefono?: number;
  nro_telefono: number;
  id_local: number;
  es_principal: boolean;
};

export interface TipoPlato {
  id_tipoplato?: number;
  nombre_tipoplato: string;
  descripcion_tipoplato: string;
};

export interface Tamanio {
  id_tamanio?: number;
  tamanio: string;
};

export interface Comida {
  id_comida?: number;
  nombre_comida: string;
  ingredientes: string;
};

export interface Pedido {
  id_pedido?: number;
  id_localcarta: number;
  nombre_cliente: string;
  fecha_pedido: Date;
  direccion_cliente: string | null;
  nro_mesa: number | null;
  precio_total: number;
};

export interface Comida_Tamanio {
  id_comida_tamanio?: number;
  id_comida: number;
  id_tamanio: number;
  precio_unidad: number;
  disponible: boolean;
  oferta: boolean | null;
};

export interface Comida_Tamanio_Pedido {
  id_comida_tamanio_pedido?: number;
  id_comida_tamanio: number;
  id_pedido: number;
  cantidad_unidades: number;
};

export interface Seccion_TipoPlato {
  id_seccion_tipoplato?: number;
  id_tipoplato: number;
  id_seccion: number;
};

export interface LocalCarta_Seccion {
  id_localcarta_seccion?: number;
  id_localcarta: number;
  id_seccion: number;
};

export interface Horario {
  id_horario?: number;
  id_localcarta: number;
  lunes_apertura: string;
  lunes_cierre: string;
  martes_apertura: string;
  martes_cierre: string;
  miercoles_apertura: string;
  miercoles_cierre: string;
  jueves_apertura: string;
  jueves_cierre: string;
  viernes_apertura: string;
  viernes_cierre: string;
  sabado_apertura: string;
  sabado_cierre: string;
  domingo_apertura: string;
  domingo_cierre: string;
};

export interface TipoPago {
  id_tipopago?: number;
  descripcion_tipopago: string;
};

export interface TipoEntrega {
  id_tipoentrega?: number;
  descripcion_tipoentrega: string;
};

export interface LocalCarta_TipoPago {
  id_localcarta_tipopago?: number;
  id_localcarta: number;
  id_tipopago: number;
};

export interface LocalCarta_TipoEntrega {
  id_localcarta_tipoentrega?: number;
  id_localcarta: number;
  id_tipoentrega: number;
};