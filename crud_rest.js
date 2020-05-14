const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/grad', (req, res) => {
    if (!req.body)
        res.sendStatus(400);
    else
        db.grad.create(req.body).then(data => { res.send(data) })
});

app.put('/gradovi/:id', (req, res) => {
    db.grad.update(
        { broj_stanovnika: req.body.br },
        { where: { id: req.params.id } }
    ).then(res.json(req.body));
});

app.get('/gradovi', (req, res) => db.grad.findAll().then(gradovi => res.json(gradovi)));

app.get('/gradovi/:id', (req, res) => db.grad.findOne({
    where: { id: req.params.id }
}).then(data => { res.send(data) })
);

app.delete('/gradovi/:id', (req, res) => db.grad.destroy({
    where: { id: req.params.id }
}).then(data => { res.json({ deleted: req.params.id }) }));


app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});