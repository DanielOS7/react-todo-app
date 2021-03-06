const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo');
const messageRouter = require('./routes/message');
const app = express();
const config = require('./config.json');
const profile = config.currentProfile;
const PORT = config[profile].node_port;

app.use(cors());
app.use(express.json());

app.use('/todos', todoRouter);
app.use('/messages', messageRouter);


app.use((err, req, res, next) => {
    res.status(500).send({
        message: 'Something went wrong',
        error: err
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
});
