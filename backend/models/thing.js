// On importe mongoose
const mongoose = require("mongoose");

// nous créons un schéma de données qui contient les champs souhaités pour chaque Thing
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});
// La méthode  Schema  de Mongoose nous permet de créer un schéma de données pour notre base de données MongoDB.

// La méthode  model  transforme ce modèle en un modèle utilisable.
module.exports = mongoose.model('Thing', thingSchema);



