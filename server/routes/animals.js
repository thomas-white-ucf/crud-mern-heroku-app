import express from "express";
import { createKitten, getAnimals } from "../controllers/animals.js";

//!___Animal Router =
const animalRouter = express.Router();

animalRouter.post("/kitten", createKitten);
animalRouter.get("/animals", getAnimals);

export default animalRouter;
