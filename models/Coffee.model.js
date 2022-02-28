//importar o mongoose
const mongoose = require("mongoose");
//para acessar o Schema do mongoose:
const Schema = mongoose.Schema;

//exemplo de função para validação - usar depois no Schema com o validade
//função para limitar a quantidade de elementos no array, usado no "sensoryNotes" do Schema - vai retornar true ou false:
function arrayLimit(array) {
  return array.length <= 10;
}

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
  //Como limitar a quantidade de elementos no array, usando a function arrayLimit, criada acima:
  sensoryNotes: {
    type: [{ type: String, maxLength: 64 }], // -> o tipo do sensory notes vai ser uma array de strings
    validate: [arrayLimit, "Array maior que o esperado"], //-> para chamar a função arrayLimit, usar o validate, que recebe dois parâmetros: 1º) a função que queremos usar para validar, 2º) a msg que será devolvida caso dê false
  },
  producerInstagram: { type: String, maxLength: 64, match: /^[@]/gm }, //-> fazendo uma validação com o match do mongoose: recebe uma regex
  acidity: { type: Number, min: 1, max: 5, default: 3 },
  sweetness: { type: Number, min: 1, max: 5, default: 3 },
  bitterness: { type: Number, min: 1, max: 5, default: 3 },
});

//exportar o mongoose.model
//.model(1º parâmetro: "nome do modelo"(nome do arquivo), 2º Parâmetro: o schema)
// = exportando um modelo (.model), que tem o nome "Coffee" (1º parâmetro), e segue a receita do coffeeScheema (2º parâmetro)
module.exports = mongoose.model("Coffee", coffeeSchema);
