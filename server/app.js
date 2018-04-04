const express=require('express');
const app=express();
const server=require('http').createServer(app);
const db = require('./database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
app.use(morgan('dev'));

app.use(cors({
    origin:true,
    credentials:true
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(cookieParser());

app.use('/api',require('./routes'));

server.listen(80,()=>{
    db();
    console.log('server running 80 port');
})
