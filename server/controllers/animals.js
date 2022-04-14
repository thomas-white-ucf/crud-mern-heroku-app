import Kitten from "../models/kittySchema.js";
import KittySchema from "../models/kittySchema.js";

export const getAnimals = async (req, res) => {
  try {
    const kittens = await Kitten.find();
    console.log(kittens);

    res.status(200).json(kittens);
    //
  } catch (error) {
    res.status(404).json({ message: error.message });
    //
  }
};

export const createKitten = async (req, res) => {
  try {
    // post data from -- request object -  data = req.body
    const littleTrailCat = new KittySchema({ name: "LittleTrailCat" });
    console.log(littleTrailCat.name);
    // res.send(200).json(littleTrailCat)
    await littleTrailCat.save();
    res.status(201).json(littleTrailCat);
  } catch (error) {
    console.log(error.message);
  }
};
