// const express = require("express");
// const Joi = require("joi");
// const router = express.Router();

//Run mongod in terminal
//THEN CLOSE TERMINAL!!
//Then run index.js

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  }
});

const Genre = mongoose.model("Genre", genreSchema);

async function createGenre(name) {
  const genre = new Genre({
    name: name
  });

  try {
    await genre.validate();
    const result = await genre.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

async function getGenres() {
  const genres = await Genre.find();
  console.log(genres);
}

async function updateGenre(name, newName) {
  try {
    const genre = await Genre.findOne({ name: name });
    if (!genre) return;

    genre.name = newName;

    const result = await genre.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

async function removeGenre(name) {
  try {
    const result = await Genre.deleteOne({ name: name });
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

createGenre();

/*
const genres = [
  { name: "action" },
  { name: "documentary" },
  { name: "animated" },
  { name: "comedy" }
];

//get genres object
router.get("/", (req, res) => {
  res.send(genres);
});

//create new genre
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

//edit genre
router.put("/:name", (req, res) => {
  const genre = genres.find(g => g.name === req.params.name);
  if (!genre)
    return res
      .status(404)
      .send("The genre with the given name could not be found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

//delete genre
router.delete("/:name", (req, res) => {
  const genre = genres.find(g => g.name === req.params.name);
  if (!genre)
    return res
      .status(404)
      .send("The genre with the given name could not be found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;

*/
