'use strict';

const getDB = require('../../db/db');
const {
  generateError,
  savePhoto,
  sendEmail,
  generateRandomString,
  validate,
} = require('../../helpers');

//Proceso de envio de email
const Hogan = require('hogan.js');
const fs = require('fs/promises');
const path = require('path');
const { editUserSchema } = require('../../schemas');

const filePath = path.join(__dirname, '..', '..', 'views', 'emailNewEmail.hjs');

const editUser = async (req, res, next) => {
  let connection;
  try {
    //Lanzamos la conexión
    connection = await getDB();
    const { id } = req.params;

    //Se genera un error si el id del token no coincide con el de params
    if (Number(id) !== req.Auth.id && req.Auth.role !== 'admin') {
      generateError('The user is unauthorized', 401);
    }

    const { name, email } = req.body;

    //Validación de los datos enviados para actualizar el usuario
    await validate(editUserSchema, { name, email });

    if (req.files?.perfil) {
      const photoName = await savePhoto(req.files.perfil);
      await connection.query(
        `
          UPDATE users SET perfil=?
          WHERE id_user=?
        `,
        [photoName, id]
      );
    }

    const [compareEmail] = await connection.query(
      `
          SELECT email
          FROM users
          WHERE id_user=?
        `,
      [id]
    );

    if (compareEmail[0].email !== email) {
      const [existEmail] = await connection.query(
        `
          SELECT id_user
          FROM users
          WHERE email=?
        `,
        [email]
      );

      if (existEmail.length > 0) {
        generateError('The email is exists already', 409);
      }

      //Se genera un código de registro
      const registration_code = generateRandomString(40);

      //Ruta de confirmación email
      const verificationLink = `${process.env.HOST_PUBLIC}/users/validate/${registration_code}`;

      //Configuració plantilla email
      const template = await fs.readFile(filePath, 'utf-8');

      //Compilación plantilla
      const compiledTemplate = Hogan.compile(template);

      await sendEmail({
        to: email,
        from: process.env.EMAIL_VERIFICATION,
        subject: 'Change the email',
        text: 'hello',
        html: compiledTemplate.render({
          verificationLink: verificationLink,
        }),
      });

      await connection.query(
        `
             UPDATE users 
             SET name=?,email=?, active=0, registration_code=?,last_up_ps=?
             WHERE id_user=?
           `,
        [name, email, registration_code, new Date(), id]
      );
      res.send({
        status: 'hold',
        message:
          'You has updated your email please confirm the validation code in your e-mail',
      });
    } else {
      await connection.query(
        `
            UPDATE users 
            SET name=?
            WHERE id_user=?
            `,
        [name, id]
      );
    }
    const [result] = await connection.query(
      `
           SELECT id_user,name,email,perfil 
            FROM USERS
            WHERE id_user=?
            `,
      [id]
    );

    res.send({
      status: 'OK',
      message: 'The user has been updated',
      id_user: result[0].id_user,
      name: result[0].name,
      email: result[0].email,
      avatar: result[0].perfil,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
