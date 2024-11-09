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
        { itemName: "Floral Dress", itemPrice: 49.99, itemImage: "https://example.com/floral_dress.jpg" },
        { itemName: "Spring Jacket", itemPrice: 79.99, itemImage: "https://example.com/spring_jacket.jpg" },
        { itemName: "Light Scarf", itemPrice: 19.99, itemImage: "https://example.com/light_scarf.jpg" }
      ]
    },
    {
      name: "Tech Gadgets",
      description: "Latest gadgets in technology.",
      category: "electronics",
      items: [
        { itemName: "Smartphone", itemPrice: 699.99, itemImage: "https://example.com/smartphone.jpg" },
        { itemName: "Bluetooth Headphones", itemPrice: 129.99, itemImage: "https://example.com/headphones.jpg" },
        { itemName: "Smartwatch", itemPrice: 199.99, itemImage: "https://example.com/smartwatch.jpg" }
      ]
    },
    {
      name: "Art Collection",
      description: "Exclusive art pieces from renowned artists.",
      category: "art",
      items: [
        { itemName: "Abstract Painting", itemPrice: 300.00, itemImage: "https://example.com/abstract_painting.jpg" },
        { itemName: "Modern Sculpture", itemPrice: 450.00, itemImage: "https://example.com/modern_sculpture.jpg" },
        { itemName: "Vintage Poster", itemPrice: 150.00, itemImage: "https://example.com/vintage_poster.jpg" }
      ]
    },
    {
      name: "Gaming Essentials",
      description: "Everything a gamer needs.",
      category: "gaming",
      items: [
        { itemName: "Gaming Mouse", itemPrice: 49.99, itemImage: "https://example.com/gaming_mouse.jpg" },
        { itemName: "Mechanical Keyboard", itemPrice: 89.99, itemImage: "https://example.com/mechanical_keyboard.jpg" },
        { itemName: "Gaming Chair", itemPrice: 199.99, itemImage: "https://example.com/gaming_chair.jpg" }
      ]
    },
    {
      name: "Fitness Gear",
      description: "Gear to help you stay fit.",
      category: "fitness",
      items: [
        { itemName: "Yoga Mat", itemPrice: 25.99, itemImage: "https://example.com/yoga_mat.jpg" },
        { itemName: "Dumbbells Set", itemPrice: 55.99, itemImage: "https://example.com/dumbbells.jpg" },
        { itemName: "Fitness Tracker", itemPrice: 79.99, itemImage: "https://example.com/fitness_tracker.jpg" }
      ]
    },
    {
      name: "Summer Essentials",
      description: "Everything you need for the summer.",
      category: "fashion",
      items: [
        { itemName: "Sunglasses", itemPrice: 25.99, itemImage: "https://example.com/sunglasses.jpg" },
        { itemName: "Beach Sandals", itemPrice: 19.99, itemImage: "https://example.com/beach_sandals.jpg" },
        { itemName: "Swimwear", itemPrice: 35.99, itemImage: "https://example.com/swimwear.jpg" }
      ]
    },
    {
      name: "Home Decor",
      description: "Decorate your home with style.",
      category: "home",
      items: [
        { itemName: "Ceramic Vase", itemPrice: 45.00, itemImage: "https://example.com/ceramic_vase.jpg" },
        { itemName: "Wall Art", itemPrice: 65.00, itemImage: "https://example.com/wall_art.jpg" },
        { itemName: "Cushion Set", itemPrice: 30.00, itemImage: "https://example.com/cushion_set.jpg" }
      ]
    }
  ];

db.collections.insertMany(data);
