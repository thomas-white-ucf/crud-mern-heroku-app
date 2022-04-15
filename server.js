import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postsRoutes from "./server/routes/posts.js";
// Accessing the path module - available default now ?
import path from "path";

dotenv.config({ path: "./server/config.env" });
// import dbo from "./db/conn.js";

// *  app = express()
const app = express();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.ATLAS_URI;

// *____Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//

// *__Database connect..
mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log(`MongoDB connected`))
  .catch((error) => console.log(error.message));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  // app.use(express.static("client/build"));
}
// ! Make sure to Specify Routes after Middleware-
// Define API routes here
// *____Routes
app.use("/posts", postsRoutes);
// app.use(require("./routes/record"));
// app.use("/users", usersRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello from Homepage. =] App/Server is Running_>");
// });

// Send every other request to the React app
// !Define any API routes before this runs

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
