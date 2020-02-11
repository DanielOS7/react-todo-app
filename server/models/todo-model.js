module.exports = (sequelize, DataTypes) => {
    return sequelize.define('todo', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });
}
