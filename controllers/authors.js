const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("blog")
      .collection("authors")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single author by id
const getAuthorById = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("blog")
      .collection("authors")
      .find({ _id: authorId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]); // selects the id
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a new author using json data
const createAuthor = async (req, res) => {
  const author = {
    name: req.body.name,
    about: req.body.about,
    favoriteTopics: req.body.favoriteTopics,
  };
  console.log(author);
  const result = await mongodb
    .getDb()
    .db("blog")
    .collection("authors")
    .insertOne(author);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while adding the author.");
  }
};

// Update an author
const updateAuthor = async (req, res) => {
  const authorId = new ObjectId(req.params.id);
  const author = {
    name: req.body.name || undefined,
    about: req.body.about || undefined,
    favoriteTopics: req.body.favoriteTopics || undefined,
  };
  // Filter out properties with undefined values so we only update specified fields
  for (const key in author) {
    if (author[key] === undefined) {
      delete author[key];
    }
  }
  const result = await mongodb
    .getDb()
    .db("blog")
    .collection("authors")
    .updateOne({ _id: authorId }, { $set: author });
  if (result.modifiedCount > 0) {
    res.status(204).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while updating the author.");
  }
};

// Delete an author
const deleteAuthor = async (req, res) => {
  const authorId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("blog")
    .collection("authors")
    .deleteOne({ _id: authorId });
  if (result.deletedCount > 0) {
    res.status(200).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while deleting the author.");
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
