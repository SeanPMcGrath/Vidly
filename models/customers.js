const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      required: true,
      default: false
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

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
