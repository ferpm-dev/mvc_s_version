const conexion = require("../db");

module.exports = {
  libroGet: async function (id) {
    let unLibro = await conexion.query("SELECT * FROM libro WHERE id = ?", [
      id,
    ]);
    return unLibro;
  },
};
