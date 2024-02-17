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
    let currentDate = new Date();
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

// Update a post
const updatePost = async (req, res) => {
  try {
    const currentDate = new Date();
    const postId = new ObjectId(req.params.id);
    const post = {
      title: req.body.title || undefined,
      author: req.body.author || undefined,
      lastEditDate: currentDate,
      topics: req.body.topics || undefined,
      status: req.body.status || undefined,
      content: req.body.content || undefined,
    };

    // Filter out properties with undefined values so we only update specified fields
    for (const key in post) {
      if (post[key] === undefined) {
        delete post[key];
      }
    }

    console.log("post: ", post);
    const result = await mongodb
      .getDb()
      .db("blog")
      .collection("posts")
      .updateOne({ _id: postId }, { $set: post });
    if (result.acknowledged) {
      res.status(200).json(result);
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while updating the post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const postId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("blog")
      .collection("posts")
      .deleteOne({ _id: postId });
    if (result.acknowledged) {
      res.status(200).json(result);
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while deleting the post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
