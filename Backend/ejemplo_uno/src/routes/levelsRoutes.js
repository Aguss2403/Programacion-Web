const express = require('express');
const router = express.Router();
const { findAll, create, findById, update, deleteById } = require('../services/levelsServices');

// Validar el cuerpo de la solicitud para crear y actualizar niveles
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

// Obtener todos los niveles
router.get('/', (req, res) => {
    const levels = findAll();
    res.json(levels);
});

// Crear un nuevo nivel
router.post('/', validateBody, (req, res) => {
    const newLevel = create(req.body);
    
    if (newLevel) {
        res.status(201).json({
            message: 'Nivel credo con éxito.',
            level: newLevel
        });
    } else {
        res.status(400).json({ message: 'No se pudo crear el nivel, carrera no encontrada.' });
    }
});

// Actualizar un nivel por ID
router.put('/:id', validateBody, (req, res) => {
    const { id } = req.params;
    const existingLevel = findById(id);

    if (!existingLevel) {
        return res.status(404).json({ message: 'Nivel no encontrado.' });
    }

    const updatedLevel = update(id, req.body);
    res.json({
        message: 'Nivel actualizado con éxito.',
        level: updatedLevel,
    });
});

// Eliminar un nivel por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const existingLevel = findById(id);

    if (!existingLevel) {
        return res.status(404).json({ message: 'Nivel no encontrado.' });
    }

    deleteById(id);
    res.json({
        message: 'Nivel eliminado con éxito.',
    });
});

module.exports = router;
