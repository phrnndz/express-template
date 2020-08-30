const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const  { verificaToken,verificaAdminRole } = require('../middlewares/autentication');  //a esto se le llama destructuracion
const Categoria = require('../models/categoria');

app.get('/usuario', verificaToken ,(req, res) => {
	Usuario.find({})
	.limit(5)
			.exec((err,usuarios)=>{
				if(err) {
					return res.status(400).json({
						status:false,
						mensaje: err
					});
				}
		
		
				res.json({
					status:true,
					mensaje:usuarios
				})

			})
  })


 app.get('/usuario/:id',verificaToken, (req, res) => {
	// res.json('Hello World!')
	let id = req.params.id;
	Usuario.find({_id:id})
			.exec((err,usuario)=>{
				if(err) {
					return res.status(400).json({
						status:false,
						mensaje: err
					});
				}

				res.json({
					status:true,
					mensaje:usuario
				})

			})

  })
  
app.post('/usuario',[verificaToken,verificaAdminRole], (req, res) => {
	let body = req.body

	let usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync(body.password,10),
		// img: body.img,
		role: body.role
	})

	usuario.save((err, usuario)=>{
		if(err) {
			return res.status(400).json({
				status:false,
				mensaje: err
			});
		}


		res.json({
			status:true,
			mensaje:usuario
		})


	});

})




app.put('/usuario/:id',[verificaToken,verificaAdminRole], (req, res) => {
	// res.json('Hello World!')
	let id = req.params.id;
	let body = {
		nombre: req.body.nombre,
	};

	Usuario.findByIdAndUpdate(id,body,{ new:true}, (err,usuarioBD)=>{
		
		if(err) {
			return res.status(400).json({
				status:false,
				mensaje: err
			});
		}


		res.json({
			status:true,
			mensaje:usuarioBD
		})

	})

  })
  


  
app.delete('/usuario/:id',[verificaToken,verificaAdminRole], (req, res) => {
	// res.json('Hello World!')
	let id = req.params.id;

	Usuario.findByIdAndRemove(id, (err,usuarioBD)=>{
		
		if(err) {
			return res.status(400).json({
				status:false,
				mensaje: err
			});
		}


		res.json({
			status:true,
			mensaje: `Usuario ${id} eliminado satisfactoriamente`
		})

	})

  })
  

module.exports = app;