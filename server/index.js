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
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  .use(morgan("tiny"))
  .use(express.json())
  .use(cors())

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
