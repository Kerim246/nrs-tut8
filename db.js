const Sequelize = require('sequelize');

const connection = new Sequelize("Grad", "root", "root", {
    dialect: 'sqlite',
    storage: 'gradovi.db',
    logging: false
});
const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

db.grad = connection.import(__dirname + '/grad.js');

db.connection.sync({ force: true }).then(function () {
    db.grad.bulkCreate([
        {
            id: '1',
            naziv: 'Sarajevo',
            broj_stanovnika: '500000'
        },
        {
            id: '2',
            naziv: 'Tuzla',
            broj_stanovnika: '100000'
        },
        {
            id: '3',
            naziv: 'Beograd',
            broj_stanovnika: '1500000'
        },
        {
            id: '4',
            naziv: 'Zenica',
            broj_stanovnika: '150000'
        },
        {
            id: '5',
            naziv: 'Zagreb',
            broj_stanovnika: '1100000'
        }
        , {
            id: '6',
            naziv: 'Berlin',
            broj_stanovnika: '5000000'
        },
        {
            id: '7',
            naziv: 'London',
            broj_stanovnika: '4000000'
        }
    ])
});

module.exports = db;