const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("blog").collection("authors").find();
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

// Create a new author using json data
const createPost = async (req, res) => {
    
};

// Update a post
const updatePost = async (req, res) => {

};

// Delete a post
const deletePost = async (req, res) => {

};

module.exports = {
  getAllAuthors,
  getAuthorById,
  //createAuthor,
  //updateAuthor,
  //deleteAuthor,
};
