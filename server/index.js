"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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


const port = process.env.PORT || 8888;
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
})
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------
//Test
  app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));
app.use(
  cors({
    origin: "https://suoni-archive-9oam-lcc7e824r-robfeulner-s-team.vercel.app",
  })
)
  /*********************************************************/

  .get("/favorite-restaurants", favorites)
  .get("/get-user/:email", getSingleUser)
  .get("/get-comments", getComments)

  .post("/add-users", handleUsers)
  .post("/add-comments/:place_id", handleComments)
  .post("/add-restaurant", addRestaurant)

  .patch("/update-favorites", updateFavorite)
  .patch("/update-comments", updateComments)

  /*********************************************************/
  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => console.log(`Listening on port ${port}`));
