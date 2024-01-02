const express = require('express');
const app = express();
const port = 3000;

app.use('/static', express.static('public'));

app.use(express.json());

//import Routes
const imageRoute = require('./routes/images');
const cssRoute = require('./routes/css');
const jsRoute = require('./routes/js');

//Route Middleware
app.use('/img', imageRoute);
app.use('/css', cssRoute);
app.use('/js', jsRoute);

app.listen(port, () => console.log('Server Running on Port ' + port));