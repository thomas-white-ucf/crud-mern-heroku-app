import express from "express";
// _import custom hooks_
import {
  getUsers,
  createUser,
  findUser,
  deleteUser,
  updateUserPATCH,
} from "../controllers/users.js";

//!___router =
const router = express.Router();

// **==GET
router.get("/", getUsers);

router.get("/:id", findUser);

// **==POST
router.post("/", createUser);

// **==DELETE
router.delete("/:id", deleteUser);

// **==PATCH
router.patch("/:id", updateUserPATCH);

export default router;
