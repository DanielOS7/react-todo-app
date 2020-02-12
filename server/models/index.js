const Sequelize = require('sequelize');
const config = require('../config.json');
const profile = config.currentProfile;
const database = config[profile].database;
const sequelize = new Sequelize(
    database.name,                 
    database.user,                 
    database.password,    
    {
        host: database.host,
        dialect: database.dialect
    }
);
const Todo = sequelize.import(__dirname + '/todo-model');
const Message = sequelize.import(__dirname + '/message-model');


// sequelize.sync({ force: true }).then(() => {
//     Todo.create({ name: 'First', description: 'First One', date: new Date()});
// });

sequelize.sync({ force: true }).then(() => {
    Message.create({ message: 'First'});
});


module.exports =  {
    Todo,
    Message
};
