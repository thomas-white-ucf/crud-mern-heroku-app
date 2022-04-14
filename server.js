import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRoutes from "./server/routes/posts.js";
//
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

// ! Make sure to Specify Routes after Middleware-

// *__Database connect..
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server And Database connected, server is running on PORT: ${PORT}`
      )
    )
  )
  .catch((error) => console.log(error.message));

// main().catch((error) => console.log(error.message));
// async function main() {
//   await mongoose.connect(CONNECTION_URL);
//   app.listen(PORT, () =>
//     console.log(
//       `Server And Database connected, server is running on PORT: ${PORT}`
//     )
//   );
// }

app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Homepage. =] App/Server is Running_>");
});

// mongoose.set("useFindAndModify", false);

// *____Routes
// app.use(require("./routes/record"));
// app.use("/users", usersRoutes);
