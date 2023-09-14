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

// IDs opcionales por estar definidos como Auto-incrementales en la BD!

export interface Usuario {
  id_usuario?: number;
  nombre_usuario: string;
  contrasenia: string;
  correo_electronico: string;
  role: string;
  activo: boolean;
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
  id_localcarta: number;
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
  id_tipoplato: number;
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
  oferta: boolean;
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

// JSON que devuelve la API al consultar el MENU completo, es un JSON de tipo jerárquico (nested)
export interface CartaCompleta {
  localCarta: LocalCarta;
  telefonos: Telefono[];
  horarios: Horario;
  tiposPago: TipoPago[];
  tiposEntrega: TipoEntrega[];
  secciones: {
    id_seccion?: number;
    nombre_seccion: string;
    tiposPlato: {
      id_tipoplato?: number;
      nombre_tipoplato: string;
      comidas: {
        id_comida?: number;
        nombre_comida: string;
        ingredientes: string;
        tamanios: {
          id_tamanio?: number;
          tamanio: string;
          precio_unidad: number;
          disponible: boolean;
          oferta: boolean;
        }[];
      }[];
    }[];
  }[];
};

/*
EJEMPLO
{
  "localCarta": {
    "id_localcarta": 1,
    "id_usuario": 1,
    "nombre_carta": "CARTA Resto1",
    "descripcion_carta": "La mejor carta1",
    "nombre_local": "Restaurante1",
    "descripcion_local": "Restaurante de cocina internacional",
    "cdi": "XXXXXXXXXXXXX",
    "calle": "Calle A",
    "altura": 123,
    "piso": "2A",
    "activo": 1
  },
  "telefonos": [
    {
      "id_telefono": 1,
      "nro_telefono": 1234567890,
      "id_localcarta": 1,
      "es_principal": 1
    },
    {
      "id_telefono": 2,
      "nro_telefono": 1294798221,
      "id_localcarta": 1,
      "es_principal": 0
    }
  ],
  "horarios": {
    "id_horario": 1,
    "id_localcarta": 1,
    "lunes_apertura": "08:00:00",
    "lunes_cierre": "16:00:00",
    "martes_apertura": "08:00:00",
    "martes_cierre": "16:00:00",
    "miercoles_apertura": "08:00:00",
    "miercoles_cierre": "16:00:00",
    "jueves_apertura": "08:00:00",
    "jueves_cierre": "16:00:00",
    "viernes_apertura": "08:00:00",
    "viernes_cierre": "20:00:00",
    "sabado_apertura": "10:00:00",
    "sabado_cierre": "22:00:00",
    "domingo_apertura": "10:00:00",
    "domingo_cierre": "20:00:00"
  },
  "tiposPago": [
    {
      "id_tipopago": 1,
      "descripcion_tipopago": "Efectivo"
    },
    {
      "id_tipopago": 2,
      "descripcion_tipopago": "Tarjeta Debito/Credito"
    },
    {
      "id_tipopago": 3,
      "descripcion_tipopago": "MercadoPago"
    }
  ],
  "tiposEntrega": [
    {
      "id_tipoentrega": 1,
      "descripcion_tipoentrega": "En el Local"
    },
    {
      "id_tipoentrega": 3,
      "descripcion_tipoentrega": "A domicilio"
    }
  ],
  "secciones": [
    {
      "id_seccion": 1,
      "nombre_seccion": "Entradas",
      "tiposPlato": [
        {
          "id_tipoplato": 1,
          "nombre_tipoplato": "Entradas Frias",
          "comidas": [
            {
              "id_comida": 1,
              "nombre_comida": "Ensaladita",
              "ingredientes": "Lechuga, tomate, queso, aderezo",
              "tamanios": [
                {
                  "id_tamanio": 1,
                  "tamanio": "Pequeño",
                  "precio_unidad": "9.22",
                  "disponible": 1,
                  "oferta": 0
                },
                {
                  "id_tamanio": 2,
                  "tamanio": "Mediano",
                  "precio_unidad": "1.27",
                  "disponible": 1,
                  "oferta": 0
                }
              ]
            }
          ]
        },
        {
          "id_tipoplato": 2,
          "nombre_tipoplato": "Entradas Calientes",
          "comidas": [
            {
              "id_comida": 3,
              "nombre_comida": "Hamburguesita",
              "ingredientes": "Carne de res, pan, lechuga, tomate, queso",
              "tamanios": [
                {
                  "id_tamanio": 1,
                  "tamanio": "Pequeño",
                  "precio_unidad": "0.98",
                  "disponible": 1,
                  "oferta": 0
                },
                {
                  "id_tamanio": 2,
                  "tamanio": "Mediano",
                  "precio_unidad": "1.50",
                  "disponible": 1,
                  "oferta": 1
                },
                {
                  "id_tamanio": 3,
                  "tamanio": "Grande",
                  "precio_unidad": "1.99",
                  "disponible": 0,
                  "oferta": 0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id_seccion": 2,
      "nombre_seccion": "Platos Principales",
      "tiposPlato": [
        {
          "id_tipoplato": 3,
          "nombre_tipoplato": "Pizza",
          "comidas": [
            {
              "id_comida": 2,
              "nombre_comida": "Pizza Margarita",
              "ingredientes": "Masa, tomate, mozzarella, albahaca",
              "tamanios": [
                {
                  "id_tamanio": 1,
                  "tamanio": "Pequeño",
                  "precio_unidad": "3.20",
                  "disponible": 1,
                  "oferta": 0
                }
              ]
            },
            {
              "id_comida": 4,
              "nombre_comida": "Pizza Anana",
              "ingredientes": "Pasta, salsa alfredo, pollo, parmesano",
              "tamanios": [
                {
                  "id_tamanio": 1,
                  "tamanio": "Pequeño",
                  "precio_unidad": "1.99",
                  "disponible": 1,
                  "oferta": 0
                },
                {
                  "id_tamanio": 3,
                  "tamanio": "Grande",
                  "precio_unidad": "2.00",
                  "disponible": 1,
                  "oferta": 0
                }
              ]
            }
          ]
        },
        {
          "id_tipoplato": 4,
          "nombre_tipoplato": "Empanadas",
          "comidas": [
            {
              "id_comida": 7,
              "nombre_comida": "Empanada Carne",
              "ingredientes": "Carne, cebolla, especias",
              "tamanios": [
                {
                  "id_tamanio": 4,
                  "tamanio": "Unidad",
                  "precio_unidad": "5.89",
                  "disponible": 1,
                  "oferta": 0
                }
              ]
            },
            {
              "id_comida": 8,
              "nombre_comida": "Empanada Pollo",
              "ingredientes": "Pollo, cebolla, pimientos",
              "tamanios": [
                {
                  "id_tamanio": 5,
                  "tamanio": "Porcion",
                  "precio_unidad": "1.78",
                  "disponible": 1,
                  "oferta": 0
                }
              ]
            },
            {
              "id_comida": 9,
              "nombre_comida": "Empanada Jamon y Queso",
              "ingredientes": "Jamón, queso, masa",
              "tamanios": [
                {
                  "id_tamanio": 1,
                  "tamanio": "Pequeño",
                  "precio_unidad": "10.50",
                  "disponible": 1,
                  "oferta": 0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id_seccion": 3,
      "nombre_seccion": "Postres",
      "tiposPlato": [
        {
          "id_tipoplato": 5,
          "nombre_tipoplato": "Tortas",
          "comidas": [
            {
              "id_comida": 5,
              "nombre_comida": "Torta Tiramisú",
              "ingredientes": "Tiramisu, Bizcochos de café, crema mascarpone, cacao",
              "tamanios": [
                {
                  "id_tamanio": 2,
                  "tamanio": "Mediano",
                  "precio_unidad": "2.10",
                  "disponible": 1,
                  "oferta": 0
                }
              ]
            },
            {
              "id_comida": 6,
              "nombre_comida": "Torta Oreo",
              "ingredientes": "Oreo, Salmón, atún, aguacate, arroz, alga",
              "tamanios": [
                {
                  "id_tamanio": 1,
                  "tamanio": "Pequeño",
                  "precio_unidad": "6.67",
                  "disponible": 1,
                  "oferta": 0
                },
                {
                  "id_tamanio": 2,
                  "tamanio": "Mediano",
                  "precio_unidad": "9.99",
                  "disponible": 1,
                  "oferta": 1
                },
                {
                  "id_tamanio": 3,
                  "tamanio": "Grande",
                  "precio_unidad": "5.55",
                  "disponible": 1,
                  "oferta": 0
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
*/