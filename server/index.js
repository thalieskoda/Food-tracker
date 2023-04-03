"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { userInfo, addRestaurant, updateFavorite, favorites, newComment } = require("./handlers")

const port = 8888;

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  .use(morgan("tiny"))
  .use(express.json())

  /*********************************************************/
  .get("/test", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "working",
    });
  })

  .get("/profile", userInfo)

  // .get("/profile/:country", country)


.get ("/favorite-restaurants", favorites)

  .post("/add-restaurant", addRestaurant)
.post("/new-comment", newComment)

  .patch ("/update-favorites", updateFavorite)

  // .delete("/profile", deleteRestaurant)
  /*********************************************************/
  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => console.log(`Listening on port ${port}`));
