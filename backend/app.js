const express = require("express");
// La méthode express crée une application express
const app = express();

// Les middlewares

// Un middleware est un bloc de code qui traite les requêtes et réponses de votre application
// La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Création de route POST
app.use(express.json());

app.post("/api/stuff", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
});

// Création de route GET
app.use("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});


// Connexion à la base de données mongoDB

// On importe mongoose d'abord
// Mongoose permet de définir des schémas pour tes données et de gérer les opérations (CRUD) plus facilement.
const mongoose = require('mongoose');

// Sert à se connecter à une base de données MongoDB.
mongoose.connect('mongodb+srv://aoffolome:<hzhWCueFe8dnanjg>@cluster0.6vmgpt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,   // utilise le nouvel analyseur d’URI, plus sûr et plus fiable.
    useUnifiedTopology: true  // active le nouveau moteur de gestion des connexions de MongoDB.
  }
)
.then(() => console.log('Connexion à MongoDB réussie !'))     // Le rappel à exécuter lorsque la promesse est résolue.
.catch(() => console.log('Connexion à MongoDB échouée !'));   // Le rappel à exécuter en cas de rejet de la promesse.

module.exports = app;
