const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, UseUnifiedTopology: true})
    .then (  ()     => console.log('Conectado ao MongoDB a DB todolist'))
    .catch( (err)   => console.log(err));