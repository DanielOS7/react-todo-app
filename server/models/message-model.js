module.exports = (sequelize, DataTypes) => {
    return sequelize.define('message', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        message: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });
}
