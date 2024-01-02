const express = require('express');
const app = express();
const port = 3000;

app.use('/static', express.static('public'));

app.use(express.json());

//import Routes
const imageRoute = require('./routes/images');

//Route Middleware
app.use('/img', imageRoute);

app.listen(port, () => console.log('Server Running on Port ' + port));