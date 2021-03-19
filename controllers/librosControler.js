//El controller se encarga de verificar la información que será enviada a los services. Verifica que los datos obtenidos cumplan con la lógica de negocios.

const librosService = require("../services/librosService");

module.exports = {
  traerUnLibro: async function (id) {
    let libro = await librosService.libroGet(id);
    return libro;
  },
};
