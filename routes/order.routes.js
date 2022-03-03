//importar o express
const express = require("express");

//criar o roteador (que vem do express)
const router = express.Router();

//importar o model (a const geralmente se chama AlgoModel)
const OrderModel = require("../models/Order.model");
//importar o Coffe também, pois ele tbm será alterado!
const CoffeeModel = require("../models/Coffee.model");

//CRUD
//Create
router.post("/create-order", async (req, res) => {
  try {
    const coffee = await CoffeeModel.findOne({ _id: req.body.coffee }); //-> achar o café referente àquela ordem
    const createdOrder = await OrderModel.create({
      ...req.body,
      totalAmount: coffee.price * req.body.quantityPurchased,
    }); //-> order criada e calculado o valor total (preço do café * quantidade comprada)

    const coffeeUpdated = await CoffeeModel.updateOne(
      { _id: req.body.coffee },
      {
        $push: { orderList: createdOrder._id }, //-> método para dar push em uma array
        stok: coffee.stok - createdOrder.quantityPurchased,
      },
      { new: true, runValidators: true }
    ); //-> update no coffee para adicionar o id da order no café, e atualizar o estoque de café a cada compra

    return res.status(201).json({ createdOrder, coffeeUpdated }); //-> para retornar mais de um objeto, colocar dentro de chaves!
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

//Read
router.get("/order-details/:orderId", async (req, res) => {
  try {
    //verificar se o parâmetro de rota existe (status 400 = Bad Request)
    if (!req.params.orderId) {
      return res
        .status(400)
        .json({ msg: "Requisição sem ID da ordem na rota" });
    }

    const foundedOrder = await OrderModel.findOne({
      _id: req.params.orderId,
    }).populate("coffee"); //o populate serve para retornar as informações daquele café (ao invés do número do id)
    return res.status(200).json(foundedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//exportar o roteador
module.exports = router;
