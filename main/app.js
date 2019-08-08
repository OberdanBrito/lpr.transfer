require('custom-env').env();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.HTTP_PORT;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE
    }
});

console.debug(
    process.env.PG_HOST,
    process.env.PG_PORT,
    process.env.PG_USER,
    process.env.PG_DATABASE
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/clients', function (request, response) {

    knex('client.transfer_tree_clients').select().then(function (rows) {
        response.status(200).send({
            items: [
                {id: 0, text: "Clientes", open: 1, items:rows}
            ]
        });
    });
});

app.get('/sites', function (request, response) {

    knex('client.transfer_tree_sites').select().then(function (rows) {
        response.status(200).send(rows);
    });
});

app.listen(port, () => {
    console.log(`Serviço LPR Trace executando na porta ${port}.`)
});