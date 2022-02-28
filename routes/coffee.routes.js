//importar o express
const express = require("express");

//criar o roteador (que vem do express)
const router = express.Router();

//importar o model (a const geralmente se chama AlgoModel)
const CoffeeModel = require("../models/Coffee.model");

//CRUD

//CREATE
//Create coffee
//função assíncrona
router.post("/create-coffee", async (req, res) => {
  try {
    const createdCoffee = await CoffeeModel.create(req.body);
    return res.status(201).json(createdCoffee);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

//READ
//Read all coffees
router.get("/all-coffees", async (req, res) => {
  try {
    const allCoffees = await CoffeeModel.find({});
    return res.status(200).json(allCoffees);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

//Read one coffee
router.get("/coffee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const coffee = await CoffeeModel.findOne({ _id: id }); //-> o parâmetro de busca será sempre um objeto, com key e value, p. ex.: {_id: id}
    return res.status(200).json(coffee);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

//UPDATE
//.patch vai editar só o que recebeu
//.put vai editar tudo
router.patch("/edit-coffee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCoffee = await CoffeeModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true } // => IMPORTANTE PARA A ROTA UPDATE!!!!
      //-> new: true => para retornar o objeto atualizado
      //-> runValidators: true => não deixa que a atualização "fure" o Schema (vai rodas todas as validações do Schema novamente na hora da atualização)
    ); //findOndeAndUpdate recebe 2 parâmetros: 1) o que é para achar, 2) o que vai atualizar.
    return res.status(200).json(updatedCoffee);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

//DELETE
router.delete("/delete-coffee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoffee = await CoffeeModel.deleteOne({ _id: id });
    return res.status(200).json(deletedCoffee);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

//exportar o roteador
module.exports = router;
