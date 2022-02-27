//importar o mongoose
const mongoose = require("mongoose");
//para acessar o Schema do mongoose:
const Schema = mongoose.Schema;

//criando o Schema:
//contentScheema é um objeto que estará instanciando a classe Schema
//o Schema receberá um objeto de parâmetro, como se fosse o 'constructor' de uma classe, e esse objeto conterá os campos que queremos guardar
const coffeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
    trim: true,
  },
  roast: {
    type: String,
    enum: ["Blond Roast", "Medium Roast", "Dark Roast"],
    required: true,
  },
  storageType: {
    type: String,
    enum: ["Beans", "Grinded"],
    required: true,
    default: "Beans",
  },
  sensoryNotes: [{ type: String, minLength: 1, maxLength: 64 }],
  acidity: { type: Number, min: 1, max: 5, default: 3 },
  sweetness: { type: Number, min: 1, max: 5, default: 3 },
  bitterness: { type: Number, min: 1, max: 5, default: 3 },
});

//exportar o schema
//.model(1º parâmetro: "nome do modelo"(nome do arquivo), 2º Parâmetro: o schema)
// = exportando um modelo (.model), que tem o nome "Coffee" (1º parâmetro), e segue a receita do coffeeScheema (2º parâmetro)
module.exports = mongoose.model("Coffee", coffeeSchema);
