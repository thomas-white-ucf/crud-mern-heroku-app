// let posts = ["temporary post..T"];
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log("getPosts ~ postMessages.length =", postMessages.length);

    res.status(200).json(postMessages);
    //
  } catch (error) {
    res.status(404).json({ message: error.message });
    //
  }
};

export const createPost = async (req, res) => {
  // ©
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  // update in Database, spread prior data
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  // const post = req.body;

  //* Make sure _id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  // * Try to Delete by id
  try {
    await PostMessage.findByIdAndRemove(id);
    // res.status(200)
    console.log("T_____ DELETE");
    res.json({ message: "Deleted by id." });
  } catch (error) {
    console.log(error);
    // res.status(404.)
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  // const post = req.body;

  //* Make sure _id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  // * Try to Delete by id
  try {
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );

    res.json(updatePost);
  } catch (error) {
    console.log(error);
    // res.status(404.)
  }
};
