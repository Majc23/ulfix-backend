const mongoose = require('mongoose');
const mongodb = 'mongodb://127.0.0.1/ulfix';

mongoose.connect(mongodb);

const db = mongoose.connection;

db.on('error', console.error.bind(console,'mongoose db conection error'));