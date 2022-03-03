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
    const coffee = await CoffeeModel.findOne({ _id: req.body.coffee });
    const createdOrder = await OrderModel.create({
      ...req.body,
      totalAmount: coffee.price * req.body.quantityPurchased,
    }); //-> order criada e calculado o valor total (prexo do café * quantidade comprada)

    const coffeeUpdated = await CoffeeModel.updateOne(
      { _id: req.body.coffee },
      {
        $push: { orderList: createdOrder._id },
        stok: coffee.stok - createdOrder.quantityPurchased,
      },
      { new: true, runValidators: true }
    );

    return res.status(201).json({ createdOrder, coffeeUpdated }); //-> para retornar mais de um objeto, colocar dentro de chaves!
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//exportar o roteador
module.exports = router;
