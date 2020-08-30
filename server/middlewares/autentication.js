const jwt = require('jsonwebtoken')

//
// Verificar Token
//

let verificaToken =( req,res, next) =>{
	let token = req.get('token'); // aqui ponemos el nombre de la variable que viene via header
	//validamos que el token que viene en el header sea valido con la funcion verify de jwt
	jwt.verify(token,process.env.SEED_DE_AUTENTICACION,(err,decoded)=>{
		if(err){
			return res.status(401).json({
				estatus:false,
				err:err
			})
		}
		//se desencripta el usuario
		req.usuario  = decoded.usuario;
		next();

	})
};



//
// Verificar Admin Role
//

let verificaAdminRole =( req,res, next) =>{
	console.log(req);
	let usuario = req.usuario; // aqui ponemos el nombre de la variable que viene via header

	if( usuario.role ==='ADMIN_ROLE' ){
		next()
	}
	else{
		return res.json({
			estatus:false,
			mensaje:'No tienes permisos para esta acción'
		})
	}
	
};





module.exports = {
	verificaToken,verificaAdminRole
}