const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("blog").collection("posts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post by id
const getPostById = async (req, res) => {
  try {
    const postId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("blog")
      .collection("posts")
      .find({ _id: postId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]); // selects the id
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new post using json data
const createPost = async (req, res) => {
  try {
    // Get the current date
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, "0");
    let mm = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0
    let yyyy = currentDate.getFullYear();
    currentDate = mm + "/" + dd + "/" + yyyy;

    const post = {
      title: req.body.title,
      author: req.body.author,
      createdDate: currentDate,
      lastEditDate: "None",
      topics: req.body.topics,
      status: req.body.status,
      content: req.body.content
    };
    console.log(post);
    const result = await mongodb
      .getDb()
      .db("blog")
      .collection("posts")
      .insertOne(post);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while creating the post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = { getAllPosts, getPostById, createPost };
