let mongoose=require('mongoose');
const{
    db_url
}=require('../config.json');

module.exports = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(db_url);
    mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    mongoose.connection.on('open', () => {
        console.log("connected db");
    })
    mongoose.connection.on('disconnected', () => {
        console.log('disconnected db')
    });
}