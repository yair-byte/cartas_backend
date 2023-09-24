export type TypesInterfaces = Usuario
  | Seccion
  | LocalCarta
  | Telefono
  | TipoPlato
  | Comida
  | Pedido
  | Pedido_Detalle
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
  url_logo: string | null;
  calle: string;
  altura: number;
  piso: string | null;
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

export interface Comida {
  id_comida?: number;
  id_tipoplato: number;
  nombre_comida: string;
  ingredientes: string;
  precio_unidad: number;
  disponible: boolean;
  url_imagen: string | null;
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

export interface Pedido_Detalle {
  id_pedido_detalle?: number;
  id_pedido: number;
  comida_descripcion: string;
  precio_unidad: number;
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
  lunes_apertura: string | null;
  lunes_cierre: string | null;
  martes_apertura: string | null;
  martes_cierre: string | null;
  miercoles_apertura: string | null;
  miercoles_cierre: string | null;
  jueves_apertura: string | null;
  jueves_cierre: string | null;
  viernes_apertura: string | null;
  viernes_cierre: string | null;
  sabado_apertura: string | null;
  sabado_cierre: string | null;
  domingo_apertura: string | null;
  domingo_cierre: string | null;
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
        precio_unidad: number;
        disponible: boolean;
        url_imagen: string | null
      }[];
    }[];
  }[];
};

/*
EJEMPLO
{
  "localCarta": {
    "id_localcarta": 2,
    "id_usuario": 3,
    "nombre_carta": "CARTA Resto2",
    "descripcion_carta": "La mejor carta2",
    "nombre_local": "Restaurante2",
    "descripcion_local": "Pizzeria con horno de leña",
    "cdi": "YYYYYYYYYYYYY",
    "calle": "Calle B",
    "altura": 456,
    "piso": null
  },
  "telefonos": [
    {
      "id_telefono": 3,
      "nro_telefono": 9876543210,
      "id_localcarta": 2,
      "es_principal": 1
    }
  ],
  "horarios": {
    "id_horario": 2,
    "id_localcarta": 2,
    "lunes_apertura": "09:00:00",
    "lunes_cierre": "18:00:00",
    "martes_apertura": "09:00:00",
    "martes_cierre": "18:00:00",
    "miercoles_apertura": "09:00:00",
    "miercoles_cierre": "18:00:00",
    "jueves_apertura": "09:00:00",
    "jueves_cierre": "18:00:00",
    "viernes_apertura": "09:00:00",
    "viernes_cierre": "20:00:00",
    "sabado_apertura": "09:00:00",
    "sabado_cierre": "22:00:00",
    "domingo_apertura": null,
    "domingo_cierre": null
  },
  "tiposPago": [
    {
      "id_tipopago": 1,
      "descripcion_tipopago": "Efectivo"
    },
    {
      "id_tipopago": 2,
      "descripcion_tipopago": "Tarjeta Debito/Credito"
    }
  ],
  "tiposEntrega": [
    {
      "id_tipoentrega": 1,
      "descripcion_tipoentrega": "En el Local"
    },
    {
      "id_tipoentrega": 2,
      "descripcion_tipoentrega": "Retiro en Local"
    }
  ],
  "secciones": [
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
              "precio_unidad": 50,
              "disponible": 1
            },
            {
              "id_comida": 6,
              "nombre_comida": "Torta Oreo",
              "ingredientes": "Oreo, Salmón, atún, aguacate, arroz, alga",
              "precio_unidad": 60,
              "disponible": 1
            }
          ]
        }
      ]
    },
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
              "precio_unidad": 10,
              "disponible": 1
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
              "precio_unidad": 30,
              "disponible": 1
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
              "precio_unidad": 20,
              "disponible": 1
            },
            {
              "id_comida": 4,
              "nombre_comida": "Pizza Anana",
              "ingredientes": "Pasta, salsa alfredo, pollo, parmesano",
              "precio_unidad": 40,
              "disponible": 1
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
              "precio_unidad": 70,
              "disponible": 1
            },
            {
              "id_comida": 8,
              "nombre_comida": "Empanada Pollo",
              "ingredientes": "Pollo, cebolla, pimientos",
              "precio_unidad": 80,
              "disponible": 1
            },
            {
              "id_comida": 9,
              "nombre_comida": "Empanada Jamon y Queso",
              "ingredientes": "Jamón, queso, masa",
              "precio_unidad": 90,
              "disponible": 1
            }
          ]
        }
      ]
    }
  ]
}
*/