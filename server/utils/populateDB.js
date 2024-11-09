const mongoose = require("mongoose");

// Connessione a MongoDB
mongoose
  .connect("mongodb://localhost:27017/k", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore nella connessione a MongoDB:", err));

// Schema per la Collection
const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome della collezione
  description: { type: String }, // Descrizione della collezione
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // Categoria della collezione
  createdAt: { type: Date, default: Date.now }, // Data di creazione
});

const Collection = mongoose.model("Collection", CollectionSchema);

async function clearCollection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/k", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Cancella tutti i documenti dalla collezione
    await Collection.deleteMany({});
    console.log("Tutti i documenti sono stati cancellati con successo.");
  } catch (error) {
    console.error("Errore durante la cancellazione:", error);
  }
}

clearCollection();

// Dati estesi con immagini reali
const data = [
  {
    name: "Spring Collection",
    description: "A vibrant collection for the spring season.",
    category: "fashion",
    price: 149.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Floral Dress",
    description: "A beautiful floral dress for spring.",
    category: "fashion",
    price: 49.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Spring Jacket",
    description: "Light jacket for cool spring evenings.",
    category: "fashion",
    price: 79.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Light Scarf",
    description: "A lightweight scarf to complement your outfit.",
    category: "fashion",
    price: 19.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Tech Gadgets",
    description: "Latest gadgets in technology.",
    category: "electronics",
    price: 699.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Smartphone",
    description: "The latest model of smartphone.",
    category: "electronics",
    price: 699.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Bluetooth Headphones",
    description: "High-quality wireless headphones.",
    category: "electronics",
    price: 129.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Smartwatch",
    description: "Stay connected with this stylish smartwatch.",
    category: "electronics",
    price: 199.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Art Collection",
    description: "Exclusive art pieces from renowned artists.",
    category: "art",
    price: 300.0,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Abstract Painting",
    description: "A stunning abstract painting for your wall.",
    category: "art",
    price: 300.0,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Modern Sculpture",
    description: "A unique modern sculpture for your home.",
    category: "art",
    price: 450.0,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Vintage Poster",
    description: "An authentic vintage poster from the 80s.",
    category: "art",
    price: 150.0,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Gaming Essentials",
    description: "Everything a gamer needs.",
    category: "gaming",
    price: 49.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Gaming Mouse",
    description: "Precision gaming mouse with customizable buttons.",
    category: "gaming",
    price: 49.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Mechanical Keyboard",
    description: "Tactile mechanical keyboard for enhanced gameplay.",
    category: "gaming",
    price: 89.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Gaming Chair",
    description: "Ergonomic chair designed for long gaming sessions.",
    category: "gaming",
    price: 199.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Fitness Gear",
    description: "Gear to help you stay fit.",
    category: "fitness",
    price: 25.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat for a comfortable workout.",
    category: "fitness",
    price: 25.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Dumbbells Set",
    description: "Adjustable dumbbells for strength training.",
    category: "fitness",
    price: 55.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Fitness Tracker",
    description: "Track your progress with this fitness tracker.",
    category: "fitness",
    price: 79.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    name: "Summer Essentials",
    description: "Everything you need for the summer.",
    category: "fashion",
    price: 25.99,
    image: "https://picsum.photos/200",
    createdAt: new Date(),
  },
];

async function insertData() {
  try {
    // Connetti al database
    await mongoose.connect("mongodb://localhost:27017/k", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connessione al database avvenuta con successo.");

    for (const collectionData of data) {
      const existingCollection = await Collection.findOne({
        name: collectionData.name,
      });

      if (!existingCollection) {
        await Collection.create(collectionData);
        console.log(`Inserita: ${collectionData.name}`);
      } else {
        console.log(`Già esistente: ${collectionData.name}`);
      }
    }
  } catch (err) {
    console.error("Errore durante l'inserimento dei dati:", err);
  } finally {
    // Chiudi la connessione al database
    mongoose.connection.close();
  }
}

insertData();
