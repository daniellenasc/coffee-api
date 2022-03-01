//importar o express
const express = require("express");

//p/ usar a variável de ambiente: importar o dotenv (biblioteca de variáveis de ambiente - definidas no arquivo .env)
require("dotenv").config();

//invocar a function connect do db.config (do mongoose)
require("./config/db.config")();

//criar aplicativo express - é, de fato, o nosso servidor
const app = express();

//configurar o app p/ receber arquivos em json da requisição
app.use(express.json());

//configurar o roteador
//importar o coffee.routes
const coffeeRouter = require("./routes/coffee.routes");
//toda rota "/coffee-inventory" que chegar, será encaminhada para coffeeRouter
app.use("/coffee-inventory", coffeeRouter);

//importar o order.routes
const orderRouter = require("./routes/order.routes");
///toda rota "/orders" que chegar, será encaminhada para orderRouter
app.use("/orders", orderRouter);

//subir o servidor e colocá-lo para ouvir as requisições HTTPe dar o retorno que está conectado na porta - é o "porteiro" (a porta está definida no arquivo .env)
app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}.`);
});
