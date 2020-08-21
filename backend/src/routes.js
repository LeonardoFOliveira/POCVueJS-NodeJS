const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

//Settings
app.use(bodyParser.json())

const {database} = require('./database');

//Routes
app.post('/api/apresentacao', (req, res) => {
    let data = req.body;
    database.addApresentacao(res, data);
})

app.put('/api/apresentacao/:id', (req, res) => {
    let {id} = req.params;
    let data = req.body;

    database.updateApresentacao(res, id, data);
})

app.get('/api/apresentacao', (req, res) => {
    database.getApresentacoes(res);
})

app.get('/api/apresentacao/:id', (req, res) => {
    let {id} = req.params;

    database.getApresentacao(res, id);
})

app.delete('/api/apresentacao/:id', (req, res) => {
    let {id} = req.params;

    database.deleteApresentacao(res, id);
})

exports.app = app;