const express = require("express");
// const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");

//Run mongod in terminal
//THEN CLOSE TERMINAL!!
//Then run index.js

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15
    }
  })
);

//get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

//create new customer
router.post("/", async (req, res) => {
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });
  customer = await customer.save();
  res.send(customer);
});

//edit customer
router.put(":/id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { isGold: req.body.isGold },
    { name: req.body.name },
    { phone: req.body.phone },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given id could not be found");

  res.send(customer);
});

//delete customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given id could not be found");

  res.send(customer);
});

//get individual customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given id could not be found");

  res.send(customer);
});

module.exports = router;
