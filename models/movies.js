const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    genre: genreSchema,
    numberInStock: Number,
    dailyRentalRate: Number
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().required(),
    genreId: Joi.string().required(), //not genre property - only for the Id
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
