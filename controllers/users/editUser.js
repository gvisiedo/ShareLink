"use strict"

const getDB = require('../../db/db');
const { generateError,savePhoto, sendEmail, generateRandomString} = require('../../helpers');

const editUser = async (req, res, next) => {
    let connection;
    try {
        //Lanzamos la conexión
        connection = await getDB();
        const {id}=req.params;
       
        //Se genera un error si el id del token no coincide con el de params
        if(Number(id) !== req.Auth.id){
            generateError("The user is unauthorized",401) 
        }
       
        const{name,email}=req.body
       
        const photoName = await savePhoto(req.files.perfil);

       await connection.query(`
       UPDATE users SET perfil=?
       WHERE id_user=?
        `,[photoName,id]);
        
        //cambio de email
       
        //esta querty hace dos funciones compara email y saca el email
        const [compareEmail] = await connection.query(`
        SELECT email
        FROM users
        WHERE email = ?
        `, [email]);
       
     
        if(compareEmail.length>0){
          generateError("El email is exists already", 409)
        }

        if(email!==compareEmail[0].email){
            res.send({
                message:"You has updated your email please confirm the validation code in your e-mail"
            });
        
        const registration_code = generateRandomString(40);
        const host_verification = `${process.env.HOST_PUBLIC}/users/validate/${registration_code}`
        sendEmail({
            to:email,
            from: process.env.EMAIL_VERIFICATION,
            subject:"Change the email",
            text:"hello",
            html:
                `
           <html>
            <head>
              </head>
              <body>
                <section>
                 <h1>verification email</h1>
                 <p>
                   Welcome to Share Link.Click on the next link for verification your email:
                   <a style= "background=blue"; href=${host_verification}" class="enlace">Confirm Email Adress</a>
                </p>
               </section>
            </body>
          </html>

        `
        })
        
        await connection.query(`
       UPDATE users SET name=?,email=?, active=0, registration_code=?
       WHERE id_user=?
       `, [name,email, registration_code,id])

        }else{
        await connection.query(`
        UPDATE users SET name=?
        WHERE id_user=?
        `,[name,id])
        }
    

      res.send({
            status: "OK",
            message: "The user has been updated"
        });

    } catch (error) {
        next(error);
        
    } finally {
        if (connection) connection.release();
    }
}

module.exports = editUser;