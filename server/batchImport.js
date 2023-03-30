const { MongoClient } = require("mongodb");
require("dotenv").config();

const userData = require("./userData.json");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  //Create a new client
  const client = new MongoClient(MONGO_URI, options);
  //Connect to the client
  await client.connect();
  //Connect tot the database
  const db = client.db("trvl-up");
  console.log("connected!");
  await db.collection("users").insertOne(userData)
  client.close();
  console.log("disconnected!");
};

batchImport();
