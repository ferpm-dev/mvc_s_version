//En app.js queda la lógica de ruteo.

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ? process.env.PORT : 3000;

const librosControlers = require("./controllers/librosControler");

app.get("/libro/:id", async function (req, res) {
  try {
    let respuesta = await librosControlers.traerUnLibro(req.params.id);
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

// Se ejecuta la app para que escuche al puerto determinado
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT} `);
});
