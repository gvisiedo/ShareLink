'use strict';
//importaciones externas
const jwt = require('jsonwebtoken');

//importaciones locales
const getDB = require('../../db/db');
const { validate, generateError } = require('../../helpers');
const { registrationSchema } = require('../../schemas');


const userLogin = async (req, res, next) => {
  let connection;
  try {
    //Se realiza la conexión
    connection = await getDB();

    //Se extrae el email y la password que el cliente envia por el body
    const { email, password } = req.body;

    //comparamos el email y la password con los datos de la bd
    const [existUser] = await connection.query(`
      SELECT id_user, role, perfil
      FROM users
      WHERE email=? AND password=SHA2(?, 512)
     `,
      [email, password]
    );

    //Si no exiten esos datos en la bd se genera un error 404(Not found)
    if (existUser.length === 0) {
      generateError('Email or Password not valid', 404);
    }

    //Comprobar que el cliente esta activo
    const [userAcive] = await connection.query(`
       SELECT active
       FROM users
       WHERE email=? AND password=SHA2(?, 512) AND active=true 
    `,[email,password])

    if(userAcive.length===0){
      generateError("The user is not active already", 402)
    }

    //Se introduce la informacion que llevará el token
    const info = {
      id: existUser[0].id_user,
      role: existUser[0].role,
    };

    //Se firma el token
    const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: '1d' });

    //comprueba email y password 
    await validate(registrationSchema, req.body);

    res.send({
      status:'ok',
      message:'Welcome!!!',
      data:token,
      email:email,
      id:existUser[0].id_user,
      avatar:existUser[0].perfil
    });

  } catch (error) {
    next(error);

  } finally {
    //Se suelta la conexión
    if (connection) connection.release();
  
  }
};

module.exports = userLogin;
