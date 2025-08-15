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
    {
      _id: "1755172641608",
      title: "Wireframes UX",
      description:
        "Pages prêtes à l'emploi : Connexion, Inscription, Tableau de bord, etc.\n" +
        "Fichiers : .fig (Figma)\n" +
        "Versions : Mobile & Web\n" +
        "Bonus Pro : CheckList et notion ux/ui, PDF",
      imageUrl:
        "https://view.subpage.app/app/company/C532b8873cc5442e2b1f2265b77a7d7dc/domain/MTiT0jFlGh/page/M6K4TirmGh/glossary/M88cc1363aa97e7307deaa1b41bf3be481676987770609/file/M975bde55df2de8b71918cd315e7c8c431708091745175.png",
      price: 2500,
      userId: "userID40282382",
    },
  ];
  res.status(200).json(stuff);
});


// Connexion à la base de données mongoDB

// On importe mongoose d'abord
// Mongoose permet de définir des schémas pour tes données et de gérer les opérations (CRUD) plus facilement.
const mongoose = require("mongoose");

// dotenv sert à gérer les variables d’environnement dans un projet, généralement pour éviter de mettre des informations
// sensibles directement dans le code (comme des mots de passe, clés API, URL de base de données, etc.).
require("dotenv").config();

// Sert à se connecter à une base de données MongoDB.
mongoose
  .connect(process.env.MONGO_URI) // process.env est un objet global dans Node.js qui contient toutes les variables d’environnement disponibles pour ton application.
  .then(() => console.log("Connexion à MongoDB réussie !")) // Le rappel à exécuter lorsque la promesse est résolue.
  .catch((err) => console.log("Connexion à MongoDB échouée !", err)); // Le rappel à exécuter en cas de rejet de la promesse.

// Création d'une instance de model
const Thing = require("./models/thing");

// Enregistrez les données
app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body, // copie de tous les éléments de req.body
  });
  thing
    .save() // enregistre toutes les informations dans le base de données
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

// Mise à jour des données
app.put('/api/stuff/:id', (req, res, next) => {
  // Cela nous permet de mettre à jour le Thing
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

// Supprimer les données
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

// Récupérer les données par id
app.get("/api/stuff/:id", (req, res, next) => {
  // retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique).
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

// Récupérer les données
app.get("/api/stuff", (req, res, next) => {
  // retourne tous les Things
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});


module.exports = app;
