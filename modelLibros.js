const util = require("util");
const mysql = require("mysql");
const conexion = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "my_books",
});
conexion.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Connection with database established.");
});
const qy = util.promisify(conexion.query).bind(conexion);

async function libroList() {
  let query = "SELECT * FROM libro";
  let queryRes = await qy(query);
  if (queryRes.length === 0) {
    res.status(413).send([]);
  }
  res.status(200);
  if (queryRes.length > 1) {
    res.send(queryRes);
  } else {
    res.send(queryRes[0]);
  }
}

async function libroGet(id) {
  const query = "SELECT * FROM libro WHERE id = ?";
  const respuesta = await qy(query, [req.params.id]);
  if (respuesta.length == 1) {
    res.send(respuesta[0]);
  } else {
    res.status(404).send("No se encuentra ese libro");
  }
}

async function libroAdd(libro) {
  let { nombre, descripcion, categoria_id, persona_id } = req.body;
  [descripcion, persona_id].forEach((element) => {
    if (!element || element.replace(/ /g, "") === "") {
      throw new Error("Faltan datos");
    }
  });
  [nombre, categoria_id].forEach((element) => {
    if (!element || element.replace(/ /g, "") === "") {
      throw new Error("Nombre y categoría son datos obligatorios");
    }
  });
  let contador = 0;
  [nombre, descripcion, categoria_id, persona_id].forEach((element) => {
    if (!!element) {
      contador++;
    }
  });
  if (Object.keys(req.body).length > contador) {
    throw new Error("Se enviaron uno o mas campos invalidos");
  }
  [nombre, descripcion] = [nombre, descripcion].map((element) =>
    element.toString().toUpperCase()
  );
  let query = "SELECT * FROM libro WHERE nombre = ?";
  let queryRes = await qy(query, [nombre]);
  if (queryRes.length > 0) {
    throw new Error("Ese libro ya existe");
  }
  query = "SELECT * FROM persona WHERE id = ?";
  queryRes = await qy(query, [persona_id]);
  if (queryRes.length == 0) {
    throw new Error("No existe la persona indicada");
  }
  query =
    "INSERT INTO libro (nombre, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)";
  queryRes = await qy(query, [nombre, descripcion, categoria_id, persona_id]);
  let id = queryRes.insertId;
  query = "SELECT * FROM libro WHERE id = ?";
  queryRes = await qy(query, id);
  res.status(200);
  res.send(queryRes[0]);
}

async function libroUpdate(libro) {
  let query = "SELECT * FROM libro WHERE id = ?";
  let respuesta = await qy(query, [req.params.id]);
  if (respuesta.length == 0) {
    throw new Error("Ese libro no existe");
  } else {
    query = "SELECT * FROM libro WHERE id = ? AND persona_id is NULL";
    respuesta = await qy(query, [req.params.id]);
    if (respuesta.length > 0) {
      throw new Error("Ese libro no estaba prestado");
    } else {
      query = "UPDATE libro SET persona_id = NULL WHERE id = ?";
      respuesta = await qy(query, [req.params.id]);
      res.status(200).send("Se realizo la devolucion correctamente");
    }
  }
}

async function libroRemove(id) {
  const id = req.params.id;
  let query = "SELECT * FROM libro WHERE id = ?";
  let respuesta = await qy(query, id);
  if (respuesta.length == 0) {
    throw new Error("No se encuentra este libro");
  } else {
    query = "SELECT * FROM libro WHERE id = ? AND persona_id <> 0";
    respuesta = await qy(query, id);
    if (respuesta.length > 0) {
      throw new Error("Ese libro esta prestado, no se puede borrar");
    } else {
      query = "DELETE FROM libro WHERE id = ?";
      respuesta = await qy(query, id);
      res.status(200).send("Se borro correctamente");
    }
  }
}
