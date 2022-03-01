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
    const createdOrder = await OrderModel.create({ ...req.body }); //-> order criada
    const coffee = await CoffeeModel.findOneAndUpdate(
      { _id: req.body.coffee },
      { $push: { orderList: createdOrder._id } }
    ); //-> localizar qual café terá comprado e inserir com .push() o id da order na orderList do coffee! = colocar (.push) dentro da array 'orderList' o id da 'createdOrder'

    return res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//exportar o roteador
module.exports = router;
