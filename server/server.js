require('./config/config');

 
const express = require('express')
const mongoose = require('mongoose');

const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Configuracion global de rutas
app.use(require('./routes/index'))



mongoose.connect('mongodb://localhost:27017/cafe',(err,res)=>{
	if(err) throw err;
	console.log('Base de Datos Up');
});
  
app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`)
})