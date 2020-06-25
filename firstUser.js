require("dotenv").config();
require("./config/mongodb");
const userModel = require("./models/User.js");
const mongoose = require("mongoose");

const seedUser ={
    "email": "admin@admin.com",
    "password": "lkqejfhqregmqejkrbglrqebg",
    "role": "admin"
}

function seedDb(seedData) {
    userModel
      .insertMany(seedData)
      .then(users => console.log(users))
      .catch(err => console.log(err));
  }
  
  seedDb(seedUser);