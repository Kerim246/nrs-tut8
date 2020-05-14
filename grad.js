const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Grad = sequelize.define('grad', {
        id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
        naziv: Sequelize.STRING,
        broj_stanovnika: Sequelize.INTEGER
    }, {
        freezeTableName: true
    }, {
        timestamps: false
    });

    return Grad;
}