"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
require("dotenv").config();

const {
  addRestaurant,
  updateFavorite,
  favorites,
  handleUsers,
  getSingleUser,
  handleComments,
  getComments,
  updateComments,
} = require("./handlers");

const port = process.env.PORT;

express().use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Below are methods that are included in express(). We chain them for convenience.
// --------------------------------------------------------------------------------
//Test
app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));
app
  .use(
    cors({
      origin: "https://food-tracker-fqh6-git-main-thalieskoda.vercel.app/",
    })
  );
  app.use(helmet());

  /*********************************************************/

  app.get("/favorite-restaurants", favorites)
  app.get("/get-user/:email", getSingleUser)
  app.get("/get-comments", getComments)

  app.post("/add-users", handleUsers)
  app.post("/add-comments/:place_id", handleComments)
  app.post("/add-restaurant", addRestaurant)

  app.patch("/update-favorites", updateFavorite)
  app.patch("/update-comments", updateComments)

  /*********************************************************/
  // this is our catch all endpoint.
  app.get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  app.listen(port, () => console.log(`Listening on port ${port}`));
