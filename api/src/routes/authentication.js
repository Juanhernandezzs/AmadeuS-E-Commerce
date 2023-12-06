const express = require("express");
const {jwtCheck} = require("../config/auth");

const router = express.Router();

router.get("/", jwtCheck, function (req, res) {
  res.send("hola estoy en /auth");
});



module.exports = router;


