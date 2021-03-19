const express = require("express");
const cors = require("cors");
const app = express();
const librosControlers = require("./controllers/librosControler");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use("/libro/:id", librosControlers);

// Se ejecuta la app para que escuche al puerto determinado
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT} `);
});
