import { Product, ShoppingList, Store, User } from '../types';

export const STORES: Store[] = ['Woolworths', 'Coles', 'Aldi', 'IGA'];

export const CATEGORIES = [
  'Fresh Produce',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Bakery',
  'Pantry',
  'Snacks & Confectionery',
  'Beverages',
  'Frozen Food',
  'Household',
  'Personal Care',
  'Baby',
  'Pet'
];

export const mockProducts: Product[] = [
  // Fresh Produce
  {
    id: 'p1',
    name: 'Bananas',
    category: 'Fresh Produce',
    brands: ['Cavendish', 'Lady Finger'],
    stores: {
      Woolworths: { price: 3.50, unit: 'kg', inStock: true },
      Coles: { price: 3.90, unit: 'kg', inStock: true },
      Aldi: { price: 3.40, unit: 'kg', inStock: true },
      IGA: { price: 4.00, unit: 'kg', inStock: true }
    },
    tags: ['fruit', 'fresh']
  },
  {
    id: 'p2',
    name: 'Apples - Pink Lady',
    category: 'Fresh Produce',
    brands: ['Aussie Apples'],
    stores: {
      Woolworths: { price: 5.50, unit: 'kg', inStock: true },
      Coles: { price: 5.90, unit: 'kg', inStock: true },
      Aldi: { price: 5.20, unit: 'kg', inStock: true },
      IGA: { price: 6.00, unit: 'kg', inStock: true }
    },
    tags: ['fruit', 'fresh']
  },
  {
    id: 'p3',
    name: 'Avocado - Hass',
    category: 'Fresh Produce',
    brands: ['Australian Avocados'],
    stores: {
      Woolworths: { price: 2.50, unit: 'each', inStock: true },
      Coles: { price: 2.70, unit: 'each', inStock: true },
      Aldi: { price: 2.30, unit: 'each', inStock: true },
      IGA: { price: 2.80, unit: 'each', inStock: true }
    },
    tags: ['fruit', 'fresh']
  },
  {
    id: 'p4',
    name: 'Carrots',
    category: 'Fresh Produce',
    brands: ['Odd Bunch'],
    stores: {
      Woolworths: { price: 2.50, unit: 'kg', inStock: true },
      Coles: { price: 2.70, unit: 'kg', inStock: true },
      Aldi: { price: 2.30, unit: 'kg', inStock: true },
      IGA: { price: 2.80, unit: 'kg', inStock: true }
    },
    tags: ['vegetable', 'fresh']
  },
  {
    id: 'p5',
    name: 'Potatoes - Brushed',
    category: 'Fresh Produce',
    brands: ['Odd Bunch'],
    stores: {
      Woolworths: { price: 3.90, unit: 'kg', inStock: true },
      Coles: { price: 4.00, unit: 'kg', inStock: true },
      Aldi: { price: 3.70, unit: 'kg', inStock: true },
      IGA: { price: 4.20, unit: 'kg', inStock: true }
    },
    tags: ['vegetable', 'fresh']
  },
  
  // Dairy & Eggs
  {
    id: 'p6',
    name: 'Milk - Full Cream',
    category: 'Dairy & Eggs',
    brands: ['Dairy Farmers', 'Pauls', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 2.20, unit: 'L', inStock: true },
      Coles: { price: 2.30, unit: 'L', inStock: true },
      Aldi: { price: 2.19, unit: 'L', inStock: true },
      IGA: { price: 2.40, unit: 'L', inStock: true }
    },
    tags: ['dairy', 'refrigerated']
  },
  {
    id: 'p7',
    name: 'Eggs - Free Range',
    category: 'Dairy & Eggs',
    brands: ['Pace Farm', 'Manning Valley', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 4.50, unit: 'pack', inStock: true },
      Coles: { price: 4.60, unit: 'pack', inStock: true },
      Aldi: { price: 4.20, unit: 'pack', inStock: true },
      IGA: { price: 4.80, unit: 'pack', inStock: true }
    },
    tags: ['eggs', 'refrigerated', 'free range']
  },
  {
    id: 'p8',
    name: 'Cheese - Tasty Block',
    category: 'Dairy & Eggs',
    brands: ['Bega', 'Mainland', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 8.00, unit: 'pack', inStock: true },
      Coles: { price: 8.50, unit: 'pack', inStock: true },
      Aldi: { price: 7.50, unit: 'pack', inStock: true },
      IGA: { price: 9.00, unit: 'pack', inStock: true }
    },
    tags: ['dairy', 'refrigerated', 'cheese']
  },
  {
    id: 'p9',
    name: 'Yoghurt - Greek Style',
    category: 'Dairy & Eggs',
    brands: ['Chobani', 'Jalna', 'Farmers Union', 'Woolworths'],
    stores: {
      Woolworths: { price: 5.00, unit: 'pack', inStock: true },
      Coles: { price: 5.20, unit: 'pack', inStock: true },
      Aldi: { price: 4.80, unit: 'pack', inStock: true },
      IGA: { price: 5.50, unit: 'pack', inStock: true }
    },
    tags: ['dairy', 'refrigerated', 'yoghurt']
  },
  
  // Meat & Seafood
  {
    id: 'p10',
    name: 'Chicken Breast',
    category: 'Meat & Seafood',
    brands: ['Lilydale', 'Ingham', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 9.00, unit: 'kg', inStock: true },
      Coles: { price: 9.50, unit: 'kg', inStock: true },
      Aldi: { price: 8.50, unit: 'kg', inStock: true },
      IGA: { price: 10.00, unit: 'kg', inStock: true }
    },
    tags: ['meat', 'refrigerated', 'chicken']
  },
  {
    id: 'p11',
    name: 'Beef Mince',
    category: 'Meat & Seafood',
    brands: ['Cape Grim', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 12.00, unit: 'kg', inStock: true },
      Coles: { price: 12.50, unit: 'kg', inStock: true },
      Aldi: { price: 11.50, unit: 'kg', inStock: true },
      IGA: { price: 13.00, unit: 'kg', inStock: true }
    },
    tags: ['meat', 'refrigerated', 'beef']
  },
  {
    id: 'p12',
    name: 'Salmon Fillets',
    category: 'Meat & Seafood',
    brands: ['Tassal', 'Huon', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 32.00, unit: 'kg', inStock: true },
      Coles: { price: 33.00, unit: 'kg', inStock: true },
      Aldi: { price: 30.00, unit: 'kg', inStock: true },
      IGA: { price: 34.00, unit: 'kg', inStock: true }
    },
    tags: ['seafood', 'refrigerated', 'fish']
  },
  
  // Bakery
  {
    id: 'p13',
    name: 'Bread - White Sliced',
    category: 'Bakery',
    brands: ['Tip Top', 'Helga\'s', 'Wonder White', 'Abbott\'s'],
    stores: {
      Woolworths: { price: 3.50, unit: 'each', inStock: true },
      Coles: { price: 3.40, unit: 'each', inStock: true },
      Aldi: { price: 3.00, unit: 'each', inStock: true },
      IGA: { price: 3.60, unit: 'each', inStock: true }
    },
    tags: ['bread', 'bakery']
  },
  {
    id: 'p14',
    name: 'Bread - Wholemeal',
    category: 'Bakery',
    brands: ['Tip Top', 'Helga\'s', 'Burgen', 'Abbott\'s'],
    stores: {
      Woolworths: { price: 3.80, unit: 'each', inStock: true },
      Coles: { price: 3.70, unit: 'each', inStock: true },
      Aldi: { price: 3.30, unit: 'each', inStock: true },
      IGA: { price: 3.90, unit: 'each', inStock: true }
    },
    tags: ['bread', 'bakery', 'wholemeal']
  },
  {
    id: 'p15',
    name: 'Croissants',
    category: 'Bakery',
    brands: ['Woolworths', 'Coles', 'Bakers Delight'],
    stores: {
      Woolworths: { price: 4.50, unit: 'pack', inStock: true },
      Coles: { price: 4.60, unit: 'pack', inStock: true },
      Aldi: { price: 4.20, unit: 'pack', inStock: true },
      IGA: { price: 4.80, unit: 'pack', inStock: true }
    },
    tags: ['bakery', 'pastry']
  },
  
  // Pantry
  {
    id: 'p16',
    name: 'Pasta - Spaghetti',
    category: 'Pantry',
    brands: ['Barilla', 'San Remo', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 1.80, unit: 'pack', inStock: true },
      Coles: { price: 1.90, unit: 'pack', inStock: true },
      Aldi: { price: 1.50, unit: 'pack', inStock: true },
      IGA: { price: 2.00, unit: 'pack', inStock: true }
    },
    tags: ['pasta', 'pantry', 'dry goods']
  },
  {
    id: 'p17',
    name: 'Rice - White Long Grain',
    category: 'Pantry',
    brands: ['SunRice', 'Tilda', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 3.00, unit: 'kg', inStock: true },
      Coles: { price: 3.20, unit: 'kg', inStock: true },
      Aldi: { price: 2.80, unit: 'kg', inStock: true },
      IGA: { price: 3.50, unit: 'kg', inStock: true }
    },
    tags: ['rice', 'pantry', 'dry goods']
  },
  {
    id: 'p18',
    name: 'Flour - Plain',
    category: 'Pantry',
    brands: ['White Wings', 'Defiance', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 2.00, unit: 'kg', inStock: true },
      Coles: { price: 2.10, unit: 'kg', inStock: true },
      Aldi: { price: 1.80, unit: 'kg', inStock: true },
      IGA: { price: 2.30, unit: 'kg', inStock: true }
    },
    tags: ['flour', 'pantry', 'baking']
  },
  {
    id: 'p19',
    name: 'Sugar - White',
    category: 'Pantry',
    brands: ['CSR', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 2.20, unit: 'kg', inStock: true },
      Coles: { price: 2.30, unit: 'kg', inStock: true },
      Aldi: { price: 2.00, unit: 'kg', inStock: true },
      IGA: { price: 2.50, unit: 'kg', inStock: true }
    },
    tags: ['sugar', 'pantry', 'baking']
  },
  {
    id: 'p20',
    name: 'Vegemite',
    category: 'Pantry',
    brands: ['Vegemite'],
    stores: {
      Woolworths: { price: 5.00, unit: 'each', inStock: true },
      Coles: { price: 5.20, unit: 'each', inStock: true },
      Aldi: { price: 4.80, unit: 'each', inStock: true },
      IGA: { price: 5.50, unit: 'each', inStock: true }
    },
    tags: ['spreads', 'pantry', 'australian']
  },
  
  // Snacks & Confectionery
  {
    id: 'p21',
    name: 'Tim Tams',
    category: 'Snacks & Confectionery',
    brands: ['Arnott\'s'],
    stores: {
      Woolworths: { price: 3.50, unit: 'pack', inStock: true },
      Coles: { price: 3.65, unit: 'pack', inStock: true },
      Aldi: { price: 3.40, unit: 'pack', inStock: true },
      IGA: { price: 3.80, unit: 'pack', inStock: true }
    },
    tags: ['biscuits', 'chocolate', 'australian']
  },
  {
    id: 'p22',
    name: 'Shapes - BBQ',
    category: 'Snacks & Confectionery',
    brands: ['Arnott\'s'],
    stores: {
      Woolworths: { price: 3.00, unit: 'pack', inStock: true },
      Coles: { price: 3.20, unit: 'pack', inStock: true },
      Aldi: { price: 2.80, unit: 'pack', inStock: true },
      IGA: { price: 3.50, unit: 'pack', inStock: true }
    },
    tags: ['crackers', 'savoury', 'australian']
  },
  {
    id: 'p23',
    name: 'Cadbury Dairy Milk Chocolate',
    category: 'Snacks & Confectionery',
    brands: ['Cadbury'],
    stores: {
      Woolworths: { price: 4.50, unit: 'each', inStock: true },
      Coles: { price: 4.65, unit: 'each', inStock: true },
      Aldi: { price: 4.30, unit: 'each', inStock: true },
      IGA: { price: 4.80, unit: 'each', inStock: true }
    },
    tags: ['chocolate', 'sweet']
  },
  
  // Beverages
  {
    id: 'p24',
    name: 'Coffee - Instant',
    category: 'Beverages',
    brands: ['Nescafé', 'Moccona', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 8.00, unit: 'each', inStock: true },
      Coles: { price: 8.50, unit: 'each', inStock: true },
      Aldi: { price: 7.50, unit: 'each', inStock: true },
      IGA: { price: 9.00, unit: 'each', inStock: true }
    },
    tags: ['coffee', 'hot drinks']
  },
  {
    id: 'p25',
    name: 'Tea - Black',
    category: 'Beverages',
    brands: ['Bushells', 'Lipton', 'Twinings', 'Dilmah'],
    stores: {
      Woolworths: { price: 4.00, unit: 'pack', inStock: true },
      Coles: { price: 4.20, unit: 'pack', inStock: true },
      Aldi: { price: 3.80, unit: 'pack', inStock: true },
      IGA: { price: 4.50, unit: 'pack', inStock: true }
    },
    tags: ['tea', 'hot drinks']
  },
  {
    id: 'p26',
    name: 'Coca-Cola',
    category: 'Beverages',
    brands: ['Coca-Cola'],
    stores: {
      Woolworths: { price: 3.15, unit: 'L', inStock: true },
      Coles: { price: 3.25, unit: 'L', inStock: true },
      Aldi: { price: 3.00, unit: 'L', inStock: true },
      IGA: { price: 3.40, unit: 'L', inStock: true }
    },
    tags: ['soft drink', 'cold drinks']
  },
  
  // Household
  {
    id: 'p27',
    name: 'Toilet Paper',
    category: 'Household',
    brands: ['Quilton', 'Kleenex', 'Woolworths', 'Coles'],
    stores: {
      Woolworths: { price: 8.00, unit: 'pack', inStock: true },
      Coles: { price: 8.50, unit: 'pack', inStock: true },
      Aldi: { price: 7.50, unit: 'pack', inStock: true },
      IGA: { price: 9.00, unit: 'pack', inStock: true }
    },
    tags: ['bathroom', 'paper products']
  },
  {
    id: 'p28',
    name: 'Laundry Detergent',
    category: 'Household',
    brands: ['Omo', 'Cold Power', 'Biozet Attack', 'Earth Choice'],
    stores: {
      Woolworths: { price: 10.00, unit: 'each', inStock: true },
      Coles: { price: 10.50, unit: 'each', inStock: true },
      Aldi: { price: 9.50, unit: 'each', inStock: true },
      IGA: { price: 11.00, unit: 'each', inStock: true }
    },
    tags: ['laundry', 'cleaning']
  },
  
  // Personal Care
  {
    id: 'p29',
    name: 'Toothpaste',
    category: 'Personal Care',
    brands: ['Colgate', 'Sensodyne', 'Macleans', 'Oral-B'],
    stores: {
      Woolworths: { price: 4.00, unit: 'each', inStock: true },
      Coles: { price: 4.20, unit: 'each', inStock: true },
      Aldi: { price: 3.80, unit: 'each', inStock: true },
      IGA: { price: 4.50, unit: 'each', inStock: true }
    },
    tags: ['dental', 'hygiene']
  },
  {
    id: 'p30',
    name: 'Shampoo',
    category: 'Personal Care',
    brands: ['Pantene', 'Head & Shoulders', 'Tresemmé', 'Garnier'],
    stores: {
      Woolworths: { price: 7.00, unit: 'each', inStock: true },
      Coles: { price: 7.20, unit: 'each', inStock: true },
      Aldi: { price: 6.80, unit: 'each', inStock: true },
      IGA: { price: 7.50, unit: 'each', inStock: true }
    },
    tags: ['hair care', 'hygiene']
  }
];

export const mockShoppingLists: ShoppingList[] = [
  {
    id: 'list1',
    name: 'Weekly Groceries',
    store: 'Woolworths',
    items: [
      {
        id: 'item1',
        productId: 'p6',
        quantity: 2,
        unit: 'L',
        purchased: false
      },
      {
        id: 'item2',
        productId: 'p13',
        quantity: 1,
        unit: 'each',
        purchased: true
      },
      {
        id: 'item3',
        productId: 'p7',
        quantity: 1,
        unit: 'pack',
        purchased: false,
        notes: 'Free range only'
      }
    ],
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-12'),
    shared: false
  },
  {
    id: 'list2',
    name: 'BBQ Party',
    store: 'Coles',
    items: [
      {
        id: 'item4',
        productId: 'p10',
        quantity: 2,
        unit: 'kg',
        purchased: false
      },
      {
        id: 'item5',
        productId: 'p4',
        quantity: 1,
        unit: 'kg',
        purchased: false
      }
    ],
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15'),
    shared: true,
    sharedWith: ['friend@example.com']
  }
];

export const mockUser: User = {
  id: 'user1',
  name: 'Alex',
  email: 'alex@example.com',
  favorites: ['p6', 'p1', 'p24'],
  preferredStore: 'Woolworths'
};
