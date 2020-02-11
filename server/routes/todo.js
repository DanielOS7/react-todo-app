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

module.exports = router;
