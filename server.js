const express = require('express');
const app = express();

const jwtToken = require('jsonwebtoken');
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');

const appRoutes = require('./routes/app-routes');
const jokesRoutes = require('./routes/jokes-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/app', appRoutes);

var jwtCheck = jwt({ secret: 'mayank-jain' });
app.use(jwtCheck);
app.use('/jokes', jokesRoutes);

app.listen(3333, () => {
    console.log('Application is up and running ...');
})