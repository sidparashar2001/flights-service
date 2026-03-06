const express = require('express');

const {PORT} = require('./config');

const {AboutController, HomeController} = require('./controllers');

const app = express();

app.listen(PORT, ()=>{
    console.log(`Successfully started the server on PORT : ${PORT}`);    
})