const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());


app.post('/upload', function(req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(500).json({
			status:false,
			message: 'Hubo un error',
		});
	}
  
	// The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
	let archivo = req.files.archivo;

	//extensiones permitidas
	let extensionesValidas = ['png','jpg','jpeg'];
	let splitArchivo = archivo.name.split('.');
	let extension = splitArchivo[splitArchivo.length-1]

	if(extensionesValidas.indexOf(extension) <0){
		return res.status(400).json({
			status:false,
			message: `La extensión ${extension} no es válida`,
		});
	}


  
	// Use the mv() method to place the file somewhere on your server
	archivo.mv(`uploads/${archivo.name}`, function(err) {
	  if (err){
		return res.status(500).json({
			status:false,
			message: 'Hubo un error',
			err
		});
		}
  
		return res.status(200).json({
			status:true,
			message: 'El archivo se subio exitosamente'
		});
	});
  });


  module.exports = app;