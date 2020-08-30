const express = require('express');

let { verificaToken} = require('../middlewares/autentication')
let app = express();
let Categoria = require('../models/categoria');

app.get('/categoria',[verificaToken],(req,res)=>{
	Categoria.find({})
	.populate('Usuario')
	.limit(5)
			.exec((err,categorias)=>{
				if(err) {
					return res.status(400).json({
						status:false,
						mensaje: err
					});
				}
		
		
				res.json({
					status:true,
					mensaje:categorias
				})

			})


})


app.get('/categoria/:id',verificaToken, (req, res) => {
	// res.json('Hello World!')
	let id = req.params.id;
	Categoria.find({_id:id})
			.exec((err,categoria)=>{
				if(err) {
					return res.status(400).json({
						status:false,
						mensaje: err
					});
				}

				res.json({
					status:true,
					mensaje:categoria
				})

			})

})


app.post('/categoria',[verificaToken], (req, res) => {
	let body = req.body

	let categoria = new Categoria({
		descripcion: body.descripcion,
		usuario: req.usuario._id,
	})

	categoria.save((err, item)=>{
		if(err) {
			return res.status(400).json({
				status:false,
				mensaje: err
			});
		}


		res.json({
			status:true,
			mensaje:item
		})


	});

})



app.put('/categoria/:id',[verificaToken], (req, res) => {
	// res.json('Hello World!')
	let id = req.params.id;
	let body = {
		descripcion: req.body.descripcion,
	};

	Categoria.findByIdAndUpdate(id,body,{ new:true}, (err,item)=>{
		
		if(err) {
			return res.status(400).json({
				status:false,
				mensaje: err
			});
		}


		res.json({
			status:true,
			mensaje:item
		})

	})

  })
  

app.delete('/categoria/:id',[verificaToken], (req, res) => {
	// res.json('Hello World!')
	let id = req.params.id;

	Categoria.findByIdAndRemove(id, (err,item)=>{
		
		if(err) {
			return res.status(400).json({
				status:false,
				mensaje: err
			});
		}


		res.json({
			status:true,
			mensaje: `Categoría ${id} eliminado satisfactoriamente`
		})

	})

})




module.exports =app;