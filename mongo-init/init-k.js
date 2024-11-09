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
      items: [
        { itemName: "Floral Dress", itemPrice: 49.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Spring Jacket", itemPrice: 79.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Light Scarf", itemPrice: 19.99, itemImage: "https://picsum.photos/200" }
      ]
    },
    {
      name: "Tech Gadgets",
      description: "Latest gadgets in technology.",
      category: "electronics",
      items: [
        { itemName: "Smartphone", itemPrice: 699.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Bluetooth Headphones", itemPrice: 129.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Smartwatch", itemPrice: 199.99, itemImage: "https://picsum.photos/200" }
      ]
    },
    {
      name: "Art Collection",
      description: "Exclusive art pieces from renowned artists.",
      category: "art",
      items: [
        { itemName: "Abstract Painting", itemPrice: 300.00, itemImage: "https://picsum.photos/200" },
        { itemName: "Modern Sculpture", itemPrice: 450.00, itemImage: "https://picsum.photos/200" },
        { itemName: "Vintage Poster", itemPrice: 150.00, itemImage: "https://picsum.photos/200" }
      ]
    },
    {
      name: "Gaming Essentials",
      description: "Everything a gamer needs.",
      category: "gaming",
      items: [
        { itemName: "Gaming Mouse", itemPrice: 49.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Mechanical Keyboard", itemPrice: 89.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Gaming Chair", itemPrice: 199.99, itemImage: "https://picsum.photos/200" }
      ]
    },
    {
      name: "Fitness Gear",
      description: "Gear to help you stay fit.",
      category: "fitness",
      items: [
        { itemName: "Yoga Mat", itemPrice: 25.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Dumbbells Set", itemPrice: 55.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Fitness Tracker", itemPrice: 79.99, itemImage: "https://picsum.photos/200" }
      ]
    },
    {
      name: "Summer Essentials",
      description: "Everything you need for the summer.",
      category: "fashion",
      items: [
        { itemName: "Sunglasses", itemPrice: 25.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Beach Sandals", itemPrice: 19.99, itemImage: "https://picsum.photos/200" },
        { itemName: "Swimwear", itemPrice: 35.99, itemImage: "https://picsum.photos/200" }
      ]
    },
    {
      name: "Home Decor",
      description: "Decorate your home with style.",
      category: "home",
      items: [
        { itemName: "Ceramic Vase", itemPrice: 45.00, itemImage: "https://picsum.photos/200" },
        { itemName: "Wall Art", itemPrice: 65.00, itemImage: "https://picsum.photos/200" },
        { itemName: "Cushion Set", itemPrice: 30.00, itemImage: "https://picsum.photos/200" }
      ]
    }
  ];

db.collections.insertMany(data);
