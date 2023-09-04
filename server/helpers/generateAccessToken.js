const express = require('express');


require('dotenv').config();
const jwt= require("jsonwebtoken");

const generateAccessToken = (email) => {
  const token = jwt.sign({ email }, "WedEase");
  return token;
};
module.exports =generateAccessToken;
