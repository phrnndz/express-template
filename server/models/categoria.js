const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
	descripcion: {
		type: String,
		required: [true, "Nombre es requerido"]
	},
	usuario: { 
		type: Schema.Types.ObjectId, 
		ref: 'Usuario' }
});


module.exports = mongoose.model('Categoria', categoriaSchema)