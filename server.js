import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import path from "path";
// import * as fs from "fs";
import postsRoutes from "./routes/posts.js";

dotenv.config({ path: "./env" });

const app = express();
const PORT = process.env.PORT || 5000;
console.log("🚀 ~ file: server.js ~ line 14 ~ PORT", PORT);
const CONNECTION_URL = process.env.ATLAS_URI;

const currentENV = "production";
// const currentENV = process.env.NODE_ENV;
console.log(
  "\n currentENV =",
  currentENV,
  "\n **currentENV___If undefined = local \n"
);

// const __dirname = new URL("client/build", import.meta.url);
// const dirname = fs.readFileSync(__dirname, "utf-8");

// *____Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(express.static("client/public"));
app.use(cors());

// *__Database connect..
mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log(`\n MongoDB connected`))
  .catch((error) => console.log(error.message));

if (currentENV === "production") {
  // * if production -- static path /client/build/index.js
  // app.use(express.static(path.join(dirname, "client/build")));
  app.use(express.static("client/build"));

  app.get("*", function (req, res) {
    // res.sendFile(path.join(dirname, "client/public/index.html"));
    // res.sendFile(path.join(__dirname + "../client/build/index.html"));
    res.sendFile(path.resolve(dirname, "client/build", "index.html"));
    // res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
    console.log("server.js ~ line 51___________ __dirname", __dirname);
  });
} else {
  app.use("/posts", postsRoutes);
  // !Define any API routes before this runs - contains "*"and "/"

  app.get("/", (req, res) => {
    res.sendFile("./client/public/index.html", { root: "." });
    // res.sendFile("./client/public/index.html", { root: __dirname });
    // res.sendFile(path.join(dirname, "client/build/index.html"));
    // res.sendFile("client/public/index.html", { root: "." });
  });
}

//**listen PORT ________
app.listen(PORT, () => {
  console.log(`\n API server now on port ${PORT}!`);
});
