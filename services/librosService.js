const libroModel = require("../models/librosModel");

async function libroList() {
  return libroModel.libroList();
}

function libroGet(id) {
  return libroModel.libroGet(id);
}

function libroAdd(libro) {
  return libroModel.libroAdd();
}

function libroUpdate(libro) {
  return libroModel.libroUpdate();
}

function libroPrestar(libro) {
  return libroModel.libroPrestar();
}

function libroDevolver(id) {
  return libroModel.libroDevolver();
}

function libroRemove(id) {
  return libroModel.libroRemove();
}

module.exports = {
  libroList,
  libroGet,
  libroAdd,
  libroUpdate,
  libroDevolver,
  libroPrestar,
  libroRemove,
};
