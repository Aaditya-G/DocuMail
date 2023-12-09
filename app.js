const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

app.use('*', (req, res) => {
    res.status(404).send('Route not defined, try making a POST request to the /api route');
});


module.exports = app;