//importar o mongoose
const mongoose = require("mongoose");
//para acessar o Schema do mongoose:
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  //relacionar o pedido com o café que foi comprado
  coffee: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee" }, //-> isso significa que vamos passar aqui: 1) um ObjectId, ou seja, o id de um outro objeto da DB para ser guardado nesse espaço, 2) a referência, ou seja, o nome do modelo criado (a string que está na exportação)
  //OBS:isso deve ser feito nos dois lados, ou seja, tbm será necessário relacionar o orderSchema lá no coffeSchema!
  quantityPurchased: { type: Number, required: true, default: 1 },
  totalAmount: { type: Number },
  date: { type: Date, default: Date.now }, //-> 'default: Date.now' retorna um Number
});

//exportar o mongoose.model
//.model(1º parâmetro: "nome do modelo"(nome do arquivo), 2º Parâmetro: o schema)
// = exportando um modelo (.model), que tem o nome "Coffee" (1º parâmetro), e segue a receita do coffeeScheema (2º parâmetro)
module.exports = mongoose.model("Order", orderSchema);
