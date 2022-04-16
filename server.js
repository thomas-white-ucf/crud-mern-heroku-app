import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import path from "path";
//
import * as url from "url";
// const __dirname = url.fileURLToPath(
//   new URL("client/build/index.html", import.meta.url)
// );

// console.log(__dirname.toString());

import * as fs from "fs";
const __dirname = new URL("client/build/index.html", import.meta.url);
const dirname = fs.readFileSync(__dirname, "utf-8");
// console.log("🚀 ~ file: server.js ~ line 18 ~ data", data)

//
// import appHTMLBaseRoutes from "./server/routes/htmlRoutes.js";
import postsRoutes from "./server/routes/posts.js";

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.ATLAS_URI;

const app = express();

// *____Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(express.static("client/public"));
app.use(express.static("client/build"));
app.use(cors());

// *__Database connect..
mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log(`MongoDB connected`))
  .catch((error) => console.log(error.message));

if (process.env.NODE_ENV === "production") {
  // * if production -- static path /client/build/index.js
  // app.use(express.static(path.resolve("/client/build")));
  // app.use(express.static(path.join(__dirname, "client/build")));
  app.use(express.static(path.join(dirname, "client/build")));
  // app.use(express.static("client/build"));
}

app.use("/posts", postsRoutes);
// !Define any API routes before this runs - contains ** and "/"

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "client/build/index.html"));
  res.sendFile(path.join(dirname, "client/build/index.html"));
});

app.get("*", function (req, res) {
  // res.sendFile(path.join(__dirname, "client/public/index.html"));
  res.sendFile(path.join(dirname, "client/public/index.html"));
});

//**listen PORT ________
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// require("./server/routes/htmlRoutes")(app);
// app.use(require("./routes/record"));
// app.use("/users", usersRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello from Homepage. =] App/Server is Running_>");
// });
//

// Send every other request to the React app
