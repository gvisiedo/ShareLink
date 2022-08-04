"use strict"
const getDB=require('../db/db')
const { generateError } = require("../helpers");

const jwt=require('jsonwebtoken');

const thisIsUser=async(req,res,next)=>{
    let connection;
    try{
    //Se realiza la conexión a la base de datos
    connection = await getDB();

    //Se extrae el token de la cabecera
    const { authorization } = req.headers;

    //Si el token no se encuentra en la cabecera este middleware pasa a error 401(Unauthorized)
    if (!authorization) {
        generateError('The authorization is missing', 401)
    }
    //Checkea que el token sea válido(virificar autorizacion y firma)
    let infoToken;
    try{
      infoToken=  jwt.verify(authorization, process.env.JWT_SECRET)
    }catch(error){
        generateError("The token is not valid",401)
    }

    //Añadimos en la req el tokeInfo 
    req.Auth=infoToken;
    console.log(">Estoy en thisIsUser ",infoToken);

  
    next();


   }catch(error){
    next(error);

    }finally{
    //Se suelta la conexión
    if(connection) connection.release();
}

}
  
module.exports= thisIsUser;