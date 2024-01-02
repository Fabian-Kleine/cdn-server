const express = require('express');
const app = express();
const path = require('path');
const config = require('./config');
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

if(config.use_test_HTML){
    app.use('/', (req,res) => {
        const absolutePath = path.join(__dirname, './test/index.html')
        res.sendFile(absolutePath);
    });
}

app.listen(port, () => console.log('Server Running on Port ' + port));