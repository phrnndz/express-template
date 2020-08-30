const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');




app.post('/login', (req,res)=>{

	let body = req.body;

	Usuario.findOne({email: body.email},(err,usuarioDB)=>{
		if(err) {
			return res.status(500).json({
				status:false,
				mensaje: 'Hubo un error'
			});
		}
		if(!usuarioDB){
			return res.status(400).json({
				status:false,
				mensaje: 'Error Usuario o Password Incorrecto (el usuario no existe)'
			});

		}

		if(bcrypt.compareSync(body.password,usuarioDB.password)){
			let token = jwt.sign({
				usuario: usuarioDB
			},process.env.SEED_DE_AUTENTICACION,{expiresIn: process.env.CADUCIDAD_TOKEN });


			return res.json({
				status:true,
				token: token
			})
		}else{
			return res.status(500).json({
				status:false,
				mensaje: 'Error Usuario o Password Incorrecto (la constraseña no es correcta)'
			});

		}


	})


	

})













module.exports = app;
