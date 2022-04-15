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
app.use(express.static("public"));
//

// *__Database connect..
mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log(`Connected, server is running on PORT: ${PORT}`))
  .catch((error) => console.log(error.message));

// ! Make sure to Specify Routes after Middleware-
// app.use("/posts", postsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.get("/", (req, res) => {
//   res.send("Hello from Homepage. =] App/Server is Running_>");
// });

app.listen(PORT, () =>
  console.log(
    `Server And Database connected, app.listen - PORT: ${PORT}`
  )
);

// Step 1:
// app.use(express.static(path.resolve("client/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve("client/build", "index.html"));
// });

// main().catch((error) => console.log(error.message));
// async function main() {
//   await mongoose.connect(CONNECTION_URL);
//   app.listen(PORT, () =>
//     console.log(
//       `Server And Database connected, server is running on PORT: ${PORT}`
//     )
//   );
// }
// ** if (true) {  -- TEST LOCAL DEV_ENV-create
// ! DEFAULT NODE_ENV By default NODE_ENV is set to production.
// ! If NODE_ENV is any other value, the pruning step will be skipped.
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   console.log("🚀 production ON");
// }

// mongoose.set("useFindAndModify", false);

// *____Routes
// app.use(require("./routes/record"));
// app.use("/users", usersRoutes);
