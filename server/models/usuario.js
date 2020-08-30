const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "Nombre es requerido"]
	},
	email : {
		type: String,
		unique:true,
		required: [true, "Email es requerido"]
	},
	password: {
		type: String,
		required: [true, "Password es requerido"]
	},
	img : {
		type: String,
		required:false
	},
	role : {
		type: String,
		default: 'USER_ROLE',
		enum: {
			values:['ADMIN_ROLE','USER_ROLE'],
			message: '{VALUE} no es un error válido'
		}
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
});

usuarioSchema.methods.toJSON = function (){
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;
	return userObject;
}

usuarioSchema.plugin(uniqueValidator,{
	message: '{PATH} debe ser único'
})

module.exports = mongoose.model('Usuario', usuarioSchema)