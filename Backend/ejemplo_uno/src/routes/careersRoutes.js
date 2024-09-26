const express = require('express');
const router = express.Router();
const { findAll, create, findById, update, deleteById } = require('../services/careersServices');

// Validar el cuerpo de la solicitud para crear y actualizar
const validateBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 400,
      message: 'El campo name es requerido.',
    });
  }

  if (typeof req.body.accredited !== 'boolean') {
    return res.status(400).json({
      status: 400,
      message: 'El campo accredited debe ser true o false.',
    });
  }

  next();
};

// Obtener todas las carreras
router.get('/', (req, res) => {
  const careers = findAll();
  res.json(careers);
});

// Crear una nueva carrera
router.post('/', validateBody, (req, res) => {
  const newCareer = create(req.body);
  res.json(newCareer);
});

// Actualizar una carrera por ID
router.put('/:id', validateBody, (req, res) => {
  const { id } = req.params;
  const existingCareer = findById(id);

  if (!existingCareer) {
    return res.status(404).json({ message: 'Carrera no encontrada.' });
  }

  const updatedCareer = update(id, req.body);
  res.json({
    message: 'Carrera actualizada con éxito.',
    career: updatedCareer,
  });
});

// Eliminar una carrera por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const existingCareer = findById(id);

  if (!existingCareer) {
    return res.status(404).json({ message: 'Carrera no encontrada.' });
  }

  deleteById(id);
  res.json({
    message: 'Carrera eliminada con éxito.',
  });
});

module.exports = router;




/* Crear un nuevo archivo de ruta para lo que es nivel y servicios para nivel, 
hacer un getAll que retorne ID y nombre de materia, para la carga de datos, tenemos un formulario con el nombre de la materia
y un dropdown con la lista de toda la materia de la universidad, lo cual va a mandar al backend el nombre y el id de la materia
hacer un findbyid con el cual se va a poder realizar la verificacion a nivel de negocio (no insertar carrera que no existen)
findbyid(id) si existe se inserta, sino no la carrera no existe
cada archivo que se crea tiene sus propios arrays representativos, por ejmeplo el array de nivel va a tener {id, name, id_carrera}
(representacion de base de datos), cuando carguemos un nuevo nivel, le pedimos en el json, el nombre y solicitar el nombre de la carrera (a nivel de interfaz grafica).
en la interfaz grafica, vamos a tener un formulario con el nombre de la materia a inscribir, y un dropdown con la lista de carrera
hacer el de nivel y materia
*/