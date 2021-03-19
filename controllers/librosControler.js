const express = require("express");
const librosService = require("../services/librosService");
const app = express.Router();

app.get("/:id", async (req, res) => {
  try {
    let respuesta = await librosService.traerUnLibro(req.params.id);
    if (respuesta.length === 1) {
      res.send(respuesta[0]);
    } else {
      res.status(404);
      throw new Error("No se encuentra ese libro");
    }
  } catch (e) {
    res.status(413).send({ Error: e.message });
  }
});

module.exports = app;
