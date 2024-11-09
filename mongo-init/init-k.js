// script che usa docker-compose per creare db con le collezioni
db = db.getSiblingDB('k'); 
console.log('DATABASE K CREATO');
db.collections.drop();
db.createCollection('collections'); 
const data = [
  {
    name: "Spring Collection",
    description: "A vibrant collection for the spring season.",
    category: "fashion",
    price: 149.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Floral Dress",
    description: "A beautiful floral dress for spring.",
    category: "fashion",
    price: 49.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Spring Jacket",
    description: "Light jacket for cool spring evenings.",
    category: "fashion",
    price: 79.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Light Scarf",
    description: "A lightweight scarf to complement your outfit.",
    category: "fashion",
    price: 19.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Tech Gadgets",
    description: "Latest gadgets in technology.",
    category: "electronics",
    price: 699.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Smartphone",
    description: "The latest model of smartphone.",
    category: "electronics",
    price: 699.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Bluetooth Headphones",
    description: "High-quality wireless headphones.",
    category: "electronics",
    price: 129.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Smartwatch",
    description: "Stay connected with this stylish smartwatch.",
    category: "electronics",
    price: 199.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Art Collection",
    description: "Exclusive art pieces from renowned artists.",
    category: "art",
    price: 300.00,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Abstract Painting",
    description: "A stunning abstract painting for your wall.",
    category: "art",
    price: 300.00,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Modern Sculpture",
    description: "A unique modern sculpture for your home.",
    category: "art",
    price: 450.00,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Vintage Poster",
    description: "An authentic vintage poster from the 80s.",
    category: "art",
    price: 150.00,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Gaming Essentials",
    description: "Everything a gamer needs.",
    category: "gaming",
    price: 49.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Gaming Mouse",
    description: "Precision gaming mouse with customizable buttons.",
    category: "gaming",
    price: 49.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Mechanical Keyboard",
    description: "Tactile mechanical keyboard for enhanced gameplay.",
    category: "gaming",
    price: 89.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Gaming Chair",
    description: "Ergonomic chair designed for long gaming sessions.",
    category: "gaming",
    price: 199.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Fitness Gear",
    description: "Gear to help you stay fit.",
    category: "fitness",
    price: 25.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat for a comfortable workout.",
    category: "fitness",
    price: 25.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Dumbbells Set",
    description: "Adjustable dumbbells for strength training.",
    category: "fitness",
    price: 55.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Fitness Tracker",
    description: "Track your progress with this fitness tracker.",
    category: "fitness",
    price: 79.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  },
  {
    name: "Summer Essentials",
    description: "Everything you need for the summer.",
    category: "fashion",
    price: 25.99,
    image: "https://picsum.photos/200",
    createdAt: new Date()
  }
];

db.collections.insertMany(data);
