//importar o express
const express = require("express");

//p/ usar a variável de ambiente: importar o dotenv (biblioteca de variáveis de ambiente - definidas no arquivo .env)
require("dotenv").config();

//invocar a function connect do db.config (do mongoose)
require("./config/db.config")();

//criar app
const app = express();

//configurar o app
app.use(express.json());

//ROTAS
//importar o coffeeRouter
const coffeeRouter = require("./routes/coffee.routes");
//toda rota "/coffee-inventory" que chegar, será encaminhada para coffeeRouter
app.use("/coffee-inventory", coffeeRouter);

//criar o "porteiro" (a porta está definida no arquivo .env)
app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}.`);
});
