const express = require('express');
const models = require('../models/index');
const router = express.Router();

router.get('', async (req, res) => {
    try {
        const result = await models.Todo.findAll();
        res.send(result);
    }
    catch (exc) {
        console.error(exc);
    }
});

router.post('', async (req, res) => {
    try {
        let first = null;
        first = await models.Todo.create({ ...req.body, date: new Date() });
        if (first) {
            res.send({ message: 'Added Todo' });
        }
        else {
            res.status(404).send({ 'message': 'Todo not found' });
        }
    } catch (exc) {
        console.error(exc);
    }
});

router.put('', async (req, res) => {
    try {
        let first = null;
        const { name, description } = req.body;
        first = await models.Todo.update({ name: name, description: description   }, {
            where: {
                id: req.body.id
            }
        });
        if (first) {
            res.send({ message: 'Updated Todo with ID: ' + req.body.id });
        }
        else {
            res.status(404).send({ 'message': 'Failed to update Todo with ID ' + req.body.id });
        }
    } catch (exc) {
        console.error(exc);
    }
});

router.delete('', async (req, res) => {
    try {
        let first = null;
        first = await models.Todo.destroy({
            where: {
                id: req.body.id
            }
        });
        if (first) {
            res.send({ message: 'Deleted Todo with ID: ' + req.body.id });
        }
        else {
            res.status(404).send({ 'message': 'Failed to delete Todo with ID ' + req.body.id });
        }
    } catch (exc) {
        console.error(exc);
    }
});

module.exports = router;
