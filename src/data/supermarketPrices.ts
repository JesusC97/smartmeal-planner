import { IngredientCategory, SupermarketPriceInfo } from '../types';

export interface CatalogProduct {
  id: string;
  keywords: string[];
  productName: string;
  category: IngredientCategory;
  defaultUnit: string;
  packSizeDesc: string;
  alcampo: {
    price: number;
    unitPrice: string;
    brand: string;
    packSize: string;
  };
  carrefour: {
    price: number;
    unitPrice: string;
    brand: string;
    packSize: string;
  };
}

// Authentic Spanish supermarket catalog items comparing Alcampo (Auchan) and Carrefour (Carrefour Classic)
export const SUPERMARKET_CATALOG: CatalogProduct[] = [
  {
    id: 'lentejas',
    keywords: ['lenteja', 'lentejas', 'pardina'],
    productName: 'Lentejas pardinas Selección (1 kg)',
    category: 'legumbres',
    defaultUnit: 'g',
    packSizeDesc: 'Paquete 1 kg',
    alcampo: {
      price: 1.85,
      unitPrice: '1,85 €/kg',
      brand: 'Auchan',
      packSize: '1 kg',
    },
    carrefour: {
      price: 2.05,
      unitPrice: '2,05 €/kg',
      brand: 'Carrefour Classic',
      packSize: '1 kg',
    },
  },
  {
    id: 'garbanzos',
    keywords: ['garbanzo', 'garbanzos'],
    productName: 'Garbanzos cocidos en tarro (400 g peso neto)',
    category: 'legumbres',
    defaultUnit: 'g',
    packSizeDesc: 'Tarro 400 g neto (570 g)',
    alcampo: {
      price: 0.72,
      unitPrice: '1,80 €/kg',
      brand: 'Auchan',
      packSize: 'Tarro 400 g',
    },
    carrefour: {
      price: 0.79,
      unitPrice: '1,98 €/kg',
      brand: 'Carrefour Classic',
      packSize: 'Tarro 400 g',
    },
  },
  {
    id: 'patatas',
    keywords: ['patata', 'patatas'],
    productName: 'Patata lavada especial freír y guisar (Malla 2 kg)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Malla 2 kg (~8-10 uds)',
    alcampo: {
      price: 2.79,
      unitPrice: '1,40 €/kg',
      brand: 'Cultivamos lo Bueno (Alcampo)',
      packSize: 'Malla 2 kg',
    },
    carrefour: {
      price: 3.19,
      unitPrice: '1,60 €/kg',
      brand: 'Carrefour Selección',
      packSize: 'Malla 2 kg',
    },
  },
  {
    id: 'cebolla',
    keywords: ['cebolla', 'cebollas', 'cebolleta'],
    productName: 'Cebolla dorada española (Malla 1 kg)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Malla 1 kg (~4-5 uds)',
    alcampo: {
      price: 1.45,
      unitPrice: '1,45 €/kg',
      brand: 'Auchan',
      packSize: 'Malla 1 kg',
    },
    carrefour: {
      price: 1.59,
      unitPrice: '1,59 €/kg',
      brand: 'Carrefour Origen',
      packSize: 'Malla 1 kg',
    },
  },
  {
    id: 'zanahoria',
    keywords: ['zanahoria', 'zanahorias'],
    productName: 'Zanahoria fresca lavada (Bolsa 1 kg)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Bolsa 1 kg (~8 uds)',
    alcampo: {
      price: 0.99,
      unitPrice: '0,99 €/kg',
      brand: 'Auchan',
      packSize: 'Bolsa 1 kg',
    },
    carrefour: {
      price: 1.09,
      unitPrice: '1,09 €/kg',
      brand: 'Carrefour',
      packSize: 'Bolsa 1 kg',
    },
  },
  {
    id: 'calabacin',
    keywords: ['calabacin', 'calabacines'],
    productName: 'Calabacín verde nacional fresco (1 kg)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Bandeja ~1 kg (3 uds)',
    alcampo: {
      price: 1.69,
      unitPrice: '1,69 €/kg',
      brand: 'Alcampo Frescos',
      packSize: '1 kg aprox',
    },
    carrefour: {
      price: 1.55,
      unitPrice: '1,55 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '1 kg aprox',
    },
  },
  {
    id: 'puerro',
    keywords: ['puerro', 'puerros'],
    productName: 'Puerro limpio en manojo (Manojo 3 uds)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Manojo 3 uds (450 g)',
    alcampo: {
      price: 1.75,
      unitPrice: '3,89 €/kg',
      brand: 'Auchan Producción Controlada',
      packSize: 'Manojo 3 uds',
    },
    carrefour: {
      price: 1.69,
      unitPrice: '3,75 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: 'Manojo 3 uds',
    },
  },
  {
    id: 'pimiento-rojo',
    keywords: ['pimiento rojo', 'pimientos rojos'],
    productName: 'Pimiento rojo dulce categoría I (Bandeja 500 g)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Bandeja 500 g (2 uds)',
    alcampo: {
      price: 1.89,
      unitPrice: '3,78 €/kg',
      brand: 'Auchan',
      packSize: 'Bandeja 500 g',
    },
    carrefour: {
      price: 1.95,
      unitPrice: '3,90 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: 'Bandeja 500 g',
    },
  },
  {
    id: 'pimiento-verde',
    keywords: ['pimiento verde', 'pimientos verdes', 'pimiento italiano'],
    productName: 'Pimiento verde italiano fresco (Bolsa 500 g)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Bolsa 500 g (~3-4 uds)',
    alcampo: {
      price: 1.49,
      unitPrice: '2,98 €/kg',
      brand: 'Auchan',
      packSize: '500 g',
    },
    carrefour: {
      price: 1.45,
      unitPrice: '2,90 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '500 g',
    },
  },
  {
    id: 'espinacas',
    keywords: ['espinaca', 'espinacas'],
    productName: 'Espinacas frescas lavadas listas para consumir (Bolsa 300 g)',
    category: 'verduras',
    defaultUnit: 'g',
    packSizeDesc: 'Bolsa 300 g',
    alcampo: {
      price: 1.19,
      unitPrice: '3,97 €/kg',
      brand: 'Auchan',
      packSize: 'Bolsa 300 g',
    },
    carrefour: {
      price: 1.25,
      unitPrice: '4,17 €/kg',
      brand: 'Carrefour Classic',
      packSize: 'Bolsa 300 g',
    },
  },
  {
    id: 'esparragos',
    keywords: ['esparrago', 'esparragos', 'trigueros'],
    productName: 'Espárragos verdes trigueros (Manojo 250 g)',
    category: 'verduras',
    defaultUnit: 'manojo',
    packSizeDesc: 'Manojo 250 g',
    alcampo: {
      price: 2.49,
      unitPrice: '9,96 €/kg',
      brand: 'Alcampo Frescos',
      packSize: '250 g',
    },
    carrefour: {
      price: 2.39,
      unitPrice: '9,56 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '250 g',
    },
  },
  {
    id: 'tomates',
    keywords: ['tomate', 'tomates', 'ensalada'],
    productName: 'Tomate de ensalada redondo categoría I (1 kg)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Malla 1 kg (~5-6 uds)',
    alcampo: {
      price: 2.19,
      unitPrice: '2,19 €/kg',
      brand: 'Cultivamos lo Bueno',
      packSize: '1 kg',
    },
    carrefour: {
      price: 2.29,
      unitPrice: '2,29 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '1 kg',
    },
  },
  {
    id: 'ajo',
    keywords: ['ajo', 'ajos', 'diente'],
    productName: 'Ajo morado de Las Pedroñeras IGP (Malla 250 g - 4 cabezas)',
    category: 'verduras',
    defaultUnit: 'ud',
    packSizeDesc: 'Malla 4 cabezas (~30-40 dientes)',
    alcampo: {
      price: 1.69,
      unitPrice: '6,76 €/kg',
      brand: 'Auchan IGP',
      packSize: 'Malla 250 g',
    },
    carrefour: {
      price: 1.75,
      unitPrice: '7,00 €/kg',
      brand: 'Carrefour IGP Pedroñeras',
      packSize: 'Malla 250 g',
    },
  },
  {
    id: 'calabaza',
    keywords: ['calabaza', 'cacahuete'],
    productName: 'Calabaza cacahuete troceada limpia (Bandeja 600 g)',
    category: 'verduras',
    defaultUnit: 'g',
    packSizeDesc: 'Bandeja 600 g',
    alcampo: {
      price: 1.89,
      unitPrice: '3,15 €/kg',
      brand: 'Auchan Frescos',
      packSize: '600 g',
    },
    carrefour: {
      price: 1.99,
      unitPrice: '3,32 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '600 g',
    },
  },
  {
    id: 'perejil',
    keywords: ['perejil'],
    productName: 'Perejil fresco rizado / plano (Manojo 50 g)',
    category: 'verduras',
    defaultUnit: 'manojo',
    packSizeDesc: 'Manojo 50 g',
    alcampo: {
      price: 0.69,
      unitPrice: '13,80 €/kg',
      brand: 'Auchan',
      packSize: '50 g',
    },
    carrefour: {
      price: 0.75,
      unitPrice: '15,00 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '50 g',
    },
  },
  {
    id: 'pechuga-pollo',
    keywords: ['pollo', 'pechuga', 'pechugas'],
    productName: 'Filetes de pechuga de pollo de corral (Bandeja 600 g)',
    category: 'carnes',
    defaultUnit: 'ud',
    packSizeDesc: 'Bandeja 600 g (~4 filetes gruesos)',
    alcampo: {
      price: 5.49,
      unitPrice: '9,15 €/kg',
      brand: 'Alcampo Producción Controlada',
      packSize: '600 g',
    },
    carrefour: {
      price: 5.75,
      unitPrice: '9,58 €/kg',
      brand: 'Carrefour El Mercado Calidad',
      packSize: '600 g',
    },
  },
  {
    id: 'carne-picada',
    keywords: ['carne picada', 'ternera', 'picada'],
    productName: 'Carne picada de vacuno 100% añojo (Bandeja 400 g)',
    category: 'carnes',
    defaultUnit: 'g',
    packSizeDesc: 'Bandeja 400 g',
    alcampo: {
      price: 4.39,
      unitPrice: '10,98 €/kg',
      brand: 'Alcampo Carnicería',
      packSize: '400 g',
    },
    carrefour: {
      price: 4.60,
      unitPrice: '11,50 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '400 g',
    },
  },
  {
    id: 'chorizo',
    keywords: ['chorizo', 'oreado', 'fresco'],
    productName: 'Chorizo fresco oreado dulce especial guiso (Pack 3 uds - 250 g)',
    category: 'carnes',
    defaultUnit: 'g',
    packSizeDesc: 'Pack 250 g',
    alcampo: {
      price: 2.15,
      unitPrice: '8,60 €/kg',
      brand: 'Auchan Charcutería',
      packSize: '250 g',
    },
    carrefour: {
      price: 2.29,
      unitPrice: '9,16 €/kg',
      brand: 'Carrefour Extra',
      packSize: '250 g',
    },
  },
  {
    id: 'salmon',
    keywords: ['salmon', 'salmón'],
    productName: 'Lomos de salmón noruego fresco sin espinas (Pack 2 lomos - 300 g)',
    category: 'pescados',
    defaultUnit: 'ud',
    packSizeDesc: 'Bandeja 2 lomos (300 g)',
    alcampo: {
      price: 5.85,
      unitPrice: '19,50 €/kg',
      brand: 'Alcampo Pescadería',
      packSize: '300 g',
    },
    carrefour: {
      price: 5.49,
      unitPrice: '18,30 €/kg',
      brand: 'Carrefour El Mercado Pescados',
      packSize: '300 g',
    },
  },
  {
    id: 'merluza',
    keywords: ['merluza', 'lomos de merluza'],
    productName: 'Lomos de merluza fresca del Cantábrico limpios (Bandeja 400 g - 4 lomos)',
    category: 'pescados',
    defaultUnit: 'ud',
    packSizeDesc: 'Bandeja 400 g (4 lomos)',
    alcampo: {
      price: 6.29,
      unitPrice: '15,73 €/kg',
      brand: 'Alcampo Pescadería',
      packSize: '400 g',
    },
    carrefour: {
      price: 6.45,
      unitPrice: '16,13 €/kg',
      brand: 'Carrefour El Mercado Pescados',
      packSize: '400 g',
    },
  },
  {
    id: 'lubina',
    keywords: ['lubina', 'lubinas'],
    productName: 'Lubina fresca entera eviscerada abierta en libro (Pieza ~400-500 g)',
    category: 'pescados',
    defaultUnit: 'ud',
    packSizeDesc: 'Bandeja 2 piezas (750 g)',
    alcampo: {
      price: 7.95,
      unitPrice: '10,60 €/kg',
      brand: 'Crianza de Nuestros Mares (Alcampo)',
      packSize: '750 g',
    },
    carrefour: {
      price: 7.79,
      unitPrice: '10,38 €/kg',
      brand: 'Carrefour Crianza Mares',
      packSize: '750 g',
    },
  },
  {
    id: 'almejas',
    keywords: ['almeja', 'almejas'],
    productName: 'Almeja japónica fresca depurada (Malla 500 g)',
    category: 'pescados',
    defaultUnit: 'g',
    packSizeDesc: 'Malla 500 g',
    alcampo: {
      price: 5.99,
      unitPrice: '11,98 €/kg',
      brand: 'Alcampo Pescadería',
      packSize: '500 g',
    },
    carrefour: {
      price: 6.25,
      unitPrice: '12,50 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '500 g',
    },
  },
  {
    id: 'huevos',
    keywords: ['huevo', 'huevos', 'camperos'],
    productName: 'Huevos camperos clase L de gallinas criadas al aire libre (Docena 12 uds)',
    category: 'lacteos',
    defaultUnit: 'ud',
    packSizeDesc: 'Estuche 12 huevos L',
    alcampo: {
      price: 2.65,
      unitPrice: '0,22 €/ud',
      brand: 'Auchan Camperos',
      packSize: 'Docena 12 uds',
    },
    carrefour: {
      price: 2.49,
      unitPrice: '0,21 €/ud',
      brand: 'Carrefour Classic Camperos',
      packSize: 'Docena 12 uds',
    },
  },
  {
    id: 'aceite-oliva',
    keywords: ['aceite de oliva', 'aove', 'virgen extra'],
    productName: 'Aceite de oliva virgen extra Gran Selección 0.8° (Botella 1 L)',
    category: 'despensa',
    defaultUnit: 'ml',
    packSizeDesc: 'Botella 1 Litro',
    alcampo: {
      price: 7.89,
      unitPrice: '7,89 €/L',
      brand: 'Auchan Gourmet AOVE',
      packSize: '1 L',
    },
    carrefour: {
      price: 8.25,
      unitPrice: '8,25 €/L',
      brand: 'Carrefour Classic Virgen Extra',
      packSize: '1 L',
    },
  },
  {
    id: 'espaguetis',
    keywords: ['espagueti', 'espaguetis', 'pasta'],
    productName: 'Espaguetis de trigo duro clásico n°5 (Paquete 500 g)',
    category: 'despensa',
    defaultUnit: 'g',
    packSizeDesc: 'Paquete 500 g',
    alcampo: {
      price: 0.82,
      unitPrice: '1,64 €/kg',
      brand: 'Auchan',
      packSize: '500 g',
    },
    carrefour: {
      price: 0.85,
      unitPrice: '1,70 €/kg',
      brand: 'Carrefour Classic',
      packSize: '500 g',
    },
  },
  {
    id: 'arroz',
    keywords: ['arroz', 'redondo'],
    productName: 'Arroz redondo extra español categoría I (Paquete 1 kg)',
    category: 'despensa',
    defaultUnit: 'g',
    packSizeDesc: 'Paquete 1 kg',
    alcampo: {
      price: 1.25,
      unitPrice: '1,25 €/kg',
      brand: 'Auchan Extra',
      packSize: '1 kg',
    },
    carrefour: {
      price: 1.32,
      unitPrice: '1,32 €/kg',
      brand: 'Carrefour Classic',
      packSize: '1 kg',
    },
  },
  {
    id: 'tomate-triturado',
    keywords: ['tomate triturado', 'tomate frito'],
    productName: 'Tomate triturado natural tamizado (Lata 400 g)',
    category: 'despensa',
    defaultUnit: 'g',
    packSizeDesc: 'Lata 400 g',
    alcampo: {
      price: 0.65,
      unitPrice: '1,63 €/kg',
      brand: 'Auchan',
      packSize: '400 g',
    },
    carrefour: {
      price: 0.69,
      unitPrice: '1,73 €/kg',
      brand: 'Carrefour Classic',
      packSize: '400 g',
    },
  },
  {
    id: 'atun-aceite',
    keywords: ['atun', 'atún', 'latas'],
    productName: 'Atún claro en aceite de oliva virgen (Pack 3 latas x 80 g)',
    category: 'despensa',
    defaultUnit: 'latas',
    packSizeDesc: 'Pack 3 latas x 80 g (240 g)',
    alcampo: {
      price: 2.89,
      unitPrice: '12,04 €/kg',
      brand: 'Auchan',
      packSize: 'Pack 3x80g',
    },
    carrefour: {
      price: 2.95,
      unitPrice: '12,29 €/kg',
      brand: 'Carrefour Extra',
      packSize: 'Pack 3x80g',
    },
  },
  {
    id: 'parmesano',
    keywords: ['parmesano', 'queso rallado', 'grana padano'],
    productName: 'Queso Parmigiano Reggiano DOP rallado fino (Sobre 60 g)',
    category: 'lacteos',
    defaultUnit: 'g',
    packSizeDesc: 'Bolsa 60 g',
    alcampo: {
      price: 1.69,
      unitPrice: '28,17 €/kg',
      brand: 'Auchan Gourmet DOP',
      packSize: '60 g',
    },
    carrefour: {
      price: 1.59,
      unitPrice: '26,50 €/kg',
      brand: 'Carrefour Extra DOP',
      packSize: '60 g',
    },
  },
  {
    id: 'quesitos',
    keywords: ['quesito', 'quesitos', 'porciones'],
    productName: 'Queso fundido en porciones (Caja 16 porciones - 250 g)',
    category: 'lacteos',
    defaultUnit: 'ud',
    packSizeDesc: 'Caja 16 porciones (250 g)',
    alcampo: {
      price: 1.49,
      unitPrice: '5,96 €/kg',
      brand: 'Auchan',
      packSize: '16 porciones',
    },
    carrefour: {
      price: 1.39,
      unitPrice: '5,56 €/kg',
      brand: 'Carrefour Classic',
      packSize: '16 porciones',
    },
  },
  {
    id: 'nata-cocinar',
    keywords: ['nata', 'nata para cocinar'],
    productName: 'Nata ligera para cocinar 15% M.G. (Pack 3 briks x 200 ml)',
    category: 'lacteos',
    defaultUnit: 'ml',
    packSizeDesc: 'Pack 3x200ml (600 ml)',
    alcampo: {
      price: 1.55,
      unitPrice: '2,58 €/L',
      brand: 'Auchan',
      packSize: '3x200 ml',
    },
    carrefour: {
      price: 1.49,
      unitPrice: '2,48 €/L',
      brand: 'Carrefour Classic',
      packSize: '3x200 ml',
    },
  },
  {
    id: 'limon',
    keywords: ['limon', 'limón', 'limones'],
    productName: 'Limón español categoría I (Malla 750 g - ~5-6 uds)',
    category: 'frutas',
    defaultUnit: 'ud',
    packSizeDesc: 'Malla 750 g',
    alcampo: {
      price: 1.49,
      unitPrice: '1,99 €/kg',
      brand: 'Auchan',
      packSize: '750 g',
    },
    carrefour: {
      price: 1.39,
      unitPrice: '1,85 €/kg',
      brand: 'Carrefour El Mercado',
      packSize: '750 g',
    },
  },
  {
    id: 'aguacate',
    keywords: ['aguacate', 'aguacates'],
    productName: 'Aguacate Hass al punto maduración (Malla 500 g - 3 uds)',
    category: 'frutas',
    defaultUnit: 'ud',
    packSizeDesc: 'Malla 3 uds',
    alcampo: {
      price: 2.75,
      unitPrice: '5,50 €/kg',
      brand: 'Alcampo Frescos',
      packSize: 'Malla 3 uds',
    },
    carrefour: {
      price: 2.89,
      unitPrice: '5,78 €/kg',
      brand: 'Carrefour Selección',
      packSize: 'Malla 3 uds',
    },
  },
  {
    id: 'tortillas-trigo',
    keywords: ['tortillas', 'fajitas', 'wrap'],
    productName: 'Tortillas de trigo para fajitas y wraps (Pack 8 uds - 320 g)',
    category: 'panaderia',
    defaultUnit: 'ud',
    packSizeDesc: 'Pack 8 uds (320 g)',
    alcampo: {
      price: 1.15,
      unitPrice: '3,59 €/kg',
      brand: 'Auchan',
      packSize: 'Pack 8 uds',
    },
    carrefour: {
      price: 1.20,
      unitPrice: '3,75 €/kg',
      brand: 'Carrefour Classic',
      packSize: 'Pack 8 uds',
    },
  },
  {
    id: 'pan-hogaza',
    keywords: ['pan', 'barra', 'hogaza', 'picatostes'],
    productName: 'Barra de pan rústico recién horneado (250 g)',
    category: 'panaderia',
    defaultUnit: 'barra',
    packSizeDesc: '1 pieza horneada (250 g)',
    alcampo: {
      price: 0.55,
      unitPrice: '2,20 €/kg',
      brand: 'Horno de Alcampo',
      packSize: '250 g',
    },
    carrefour: {
      price: 0.59,
      unitPrice: '2,36 €/kg',
      brand: 'Panadería Carrefour',
      packSize: '250 g',
    },
  },
  {
    id: 'vino-blanco',
    keywords: ['vino blanco', 'vino'],
    productName: 'Vino blanco de mesa especial para cocinar (Brik 1 L)',
    category: 'despensa',
    defaultUnit: 'ml',
    packSizeDesc: 'Brik 1 L',
    alcampo: {
      price: 1.10,
      unitPrice: '1,10 €/L',
      brand: 'Auchan',
      packSize: '1 L',
    },
    carrefour: {
      price: 1.15,
      unitPrice: '1,15 €/L',
      brand: 'Carrefour',
      packSize: '1 L',
    },
  },
  {
    id: 'caldo-pollo',
    keywords: ['caldo de pollo', 'caldo'],
    productName: 'Caldo de pollo casero 100% natural (Brik 1 L)',
    category: 'despensa',
    defaultUnit: 'ml',
    packSizeDesc: 'Brik 1 L',
    alcampo: {
      price: 1.45,
      unitPrice: '1,45 €/L',
      brand: 'Auchan',
      packSize: '1 L',
    },
    carrefour: {
      price: 1.49,
      unitPrice: '1,49 €/L',
      brand: 'Carrefour Classic',
      packSize: '1 L',
    },
  },
  {
    id: 'pimenton',
    keywords: ['pimenton', 'pimentón', 'especias', 'comino', 'oregano', 'romero'],
    productName: 'Pimentón dulce de La Vera con Denominación de Origen (Bote 75 g)',
    category: 'despensa',
    defaultUnit: 'cda',
    packSizeDesc: 'Bote 75 g',
    alcampo: {
      price: 1.49,
      unitPrice: '19,87 €/kg',
      brand: 'Auchan DOP La Vera',
      packSize: 'Bote 75 g',
    },
    carrefour: {
      price: 1.59,
      unitPrice: '21,20 €/kg',
      brand: 'Carrefour Selección La Vera',
      packSize: 'Bote 75 g',
    },
  },
  {
    id: 'sal',
    keywords: ['sal', 'sal fina', 'sal marina'],
    productName: 'Sal marina fina yodada de salinas (Paquete 1 kg)',
    category: 'despensa',
    defaultUnit: 'cda',
    packSizeDesc: 'Paquete 1 kg',
    alcampo: {
      price: 0.35,
      unitPrice: '0,35 €/kg',
      brand: 'Auchan',
      packSize: '1 kg',
    },
    carrefour: {
      price: 0.35,
      unitPrice: '0,35 €/kg',
      brand: 'Carrefour Classic',
      packSize: '1 kg',
    },
  },
  {
    id: 'leche',
    keywords: ['leche', 'entera', 'desnatada', 'semidesnatada'],
    productName: 'Leche entera de origen España con calcio (Brik 1 L)',
    category: 'lacteos',
    defaultUnit: 'l',
    packSizeDesc: 'Brik 1 L',
    alcampo: {
      price: 0.91,
      unitPrice: '0,91 €/L',
      brand: 'Auchan',
      packSize: '1 L',
    },
    carrefour: {
      price: 0.89,
      unitPrice: '0,89 €/L',
      brand: 'Carrefour Classic',
      packSize: '1 L',
    },
  },
  {
    id: 'cafe',
    keywords: ['cafe', 'café'],
    productName: 'Café molido natural tueste natural mezcla (Paquete 250 g)',
    category: 'despensa',
    defaultUnit: 'paquete',
    packSizeDesc: 'Paquete 250 g',
    alcampo: {
      price: 1.95,
      unitPrice: '7,80 €/kg',
      brand: 'Auchan',
      packSize: '250 g',
    },
    carrefour: {
      price: 1.89,
      unitPrice: '7,56 €/kg',
      brand: 'Carrefour Classic',
      packSize: '250 g',
    },
  },
  {
    id: 'platano',
    keywords: ['platano', 'plátano', 'banana'],
    productName: 'Plátano de Canarias IGP categoría extra (1 kg)',
    category: 'frutas',
    defaultUnit: 'kg',
    packSizeDesc: 'Malla 1 kg (~5-6 uds)',
    alcampo: {
      price: 1.99,
      unitPrice: '1,99 €/kg',
      brand: 'Auchan IGP Canarias',
      packSize: '1 kg',
    },
    carrefour: {
      price: 2.15,
      unitPrice: '2,15 €/kg',
      brand: 'Carrefour Selección Canarias',
      packSize: '1 kg',
    },
  },
];

// Helper to sanitize search string
function clean(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Find matching supermarket product and price information for any ingredient name.
 */
export function findSupermarketPrice(ingredientName: string, category: IngredientCategory): SupermarketPriceInfo {
  const normalizedQuery = clean(ingredientName);
  
  // Find match in catalog
  let matched = SUPERMARKET_CATALOG.find(item => {
    return item.keywords.some(kw => {
      const ckw = clean(kw);
      return normalizedQuery.includes(ckw) || ckw.includes(normalizedQuery);
    });
  });

  // Fallback: category-based estimation if custom item is not in pre-seeded catalog
  if (!matched) {
    const baseEstimate = getCategoryFallbackPrice(category, ingredientName);
    const savings = Math.abs(baseEstimate.alcampo.price - baseEstimate.carrefour.price);
    const cheaperStore =
      baseEstimate.alcampo.price < baseEstimate.carrefour.price
        ? 'alcampo'
        : baseEstimate.alcampo.price > baseEstimate.carrefour.price
        ? 'carrefour'
        : 'empate';

    const encoded = encodeURIComponent(ingredientName);
    return {
      query: ingredientName,
      productName: `${ingredientName} (${baseEstimate.packSizeDesc})`,
      category,
      alcampo: {
        ...baseEstimate.alcampo,
        url: `https://www.alcampo.es/compra-online/search?q=${encoded}`,
        inStock: true,
      },
      carrefour: {
        ...baseEstimate.carrefour,
        url: `https://www.carrefour.es/supermercado/buscar?q=${encoded}`,
        inStock: true,
      },
      cheaperStore,
      savings: Number(savings.toFixed(2)),
    };
  }

  const encoded = encodeURIComponent(matched.keywords[0] || ingredientName);
  const diff = Number(Math.abs(matched.alcampo.price - matched.carrefour.price).toFixed(2));
  const cheaperStore =
    matched.alcampo.price < matched.carrefour.price
      ? 'alcampo'
      : matched.alcampo.price > matched.carrefour.price
      ? 'carrefour'
      : 'empate';

  return {
    query: ingredientName,
    productName: matched.productName,
    category: matched.category,
    alcampo: {
      ...matched.alcampo,
      url: `https://www.alcampo.es/compra-online/search?q=${encoded}`,
      inStock: true,
    },
    carrefour: {
      ...matched.carrefour,
      url: `https://www.carrefour.es/supermercado/buscar?q=${encoded}`,
      inStock: true,
    },
    cheaperStore,
    savings: diff,
  };
}

function getCategoryFallbackPrice(category: IngredientCategory, name: string) {
  // Deterministic seed based on name to keep consistent prices
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const offset = ((seed % 10) - 5) / 10; // -0.5 to +0.4

  switch (category) {
    case 'carnes':
      return {
        packSizeDesc: 'Bandeja ~500 g',
        alcampo: { price: Number((5.20 + offset).toFixed(2)), unitPrice: '10,40 €/kg', brand: 'Auchan Carnicería', packSize: '500 g' },
        carrefour: { price: Number((5.45 + offset).toFixed(2)), unitPrice: '10,90 €/kg', brand: 'Carrefour El Mercado', packSize: '500 g' },
      };
    case 'pescados':
      return {
        packSizeDesc: 'Bandeja ~400 g',
        alcampo: { price: Number((6.10 + offset).toFixed(2)), unitPrice: '15,25 €/kg', brand: 'Alcampo Pescados', packSize: '400 g' },
        carrefour: { price: Number((5.95 + offset).toFixed(2)), unitPrice: '14,88 €/kg', brand: 'Carrefour Pescados', packSize: '400 g' },
      };
    case 'verduras':
    case 'frutas':
      return {
        packSizeDesc: 'Bolsa / Unidad ~1 kg',
        alcampo: { price: Number((1.65 + offset * 0.3).toFixed(2)), unitPrice: '1,65 €/kg', brand: 'Auchan', packSize: '1 kg' },
        carrefour: { price: Number((1.75 + offset * 0.3).toFixed(2)), unitPrice: '1,75 €/kg', brand: 'Carrefour El Mercado', packSize: '1 kg' },
      };
    case 'lacteos':
      return {
        packSizeDesc: 'Unidad estándar',
        alcampo: { price: Number((1.80 + offset * 0.2).toFixed(2)), unitPrice: 'Estándar', brand: 'Auchan', packSize: '1 ud' },
        carrefour: { price: Number((1.72 + offset * 0.2).toFixed(2)), unitPrice: 'Estándar', brand: 'Carrefour Classic', packSize: '1 ud' },
      };
    case 'panaderia':
      return {
        packSizeDesc: 'Pieza / Paquete',
        alcampo: { price: Number((1.15 + offset * 0.1).toFixed(2)), unitPrice: 'Unidad', brand: 'Auchan Panadería', packSize: '1 ud' },
        carrefour: { price: Number((1.20 + offset * 0.1).toFixed(2)), unitPrice: 'Unidad', brand: 'Carrefour Panadería', packSize: '1 ud' },
      };
    default:
      return {
        packSizeDesc: 'Unidad / Pack',
        alcampo: { price: Number((1.50 + offset * 0.2).toFixed(2)), unitPrice: 'Estándar', brand: 'Auchan', packSize: '1 ud' },
        carrefour: { price: Number((1.55 + offset * 0.2).toFixed(2)), unitPrice: 'Estándar', brand: 'Carrefour', packSize: '1 ud' },
      };
  }
}
