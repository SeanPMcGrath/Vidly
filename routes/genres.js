const express = require("express");
const Joi = require("joi");
const router = express.Router();

//Run mongod in terminal
//THEN CLOSE TERMINAL!!
//Then run index.js

const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3
    }
  })
);

//get genres object
router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

//create new genre
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

//edit genre
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res
      .status(404)
      .send("The genre with the given id could not be found");

  res.send(genre);
});

//delete genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res
      .status(404)
      .send("The genre with the given id could not be found");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res
      .status(404)
      .send("The genre with the given id could not be found");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
