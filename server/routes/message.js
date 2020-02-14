const express = require('express');
const models = require('../models/index');
const router = express.Router();

router.get('', async (req, res) => {
    try {
        const result = await models.Message.findAll();
        res.send(result);
    }
    catch (exc) {
        console.error(exc);
    }
});

router.post('', async (req, res) => {
    try {
        let first = null;
        first = await models.Message.create({ ...req.body });
        if (first) {
            res.send({ message: 'Added new message' });
        }
        else {
            res.status(404).send({ 'message': 'Message not found' });
        }
    } catch (exc) {
        console.error(exc);
    }
});

router.put('', async (req, res) => {
    res.send('HTTP Method Not implemented!');
});

router.delete('', async (req, res) => {
    try {
        await models.Message.destroy({
            where: {},
            truncate: true
        });
        res.send({ message: 'Cleared Messages' });
    } catch (exc) {
        console.error(exc);
    }
});

module.exports = router;