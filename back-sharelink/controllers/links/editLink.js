'use sstrict';
const getDB = require('../../db/db');
const { generateError, validate, savePhoto } = require('../../helpers');
const { registrationLink } = require('../../schemas');

const editLink = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { url, title, description } = req.body;
    const { id } = req.params;

    if (!url) {
      generateError("The field 'url' is required", 400);
    }
    if (!title) {
      generateError("The field 'title' is required", 400);
    }
    if (!description) {
      generateError("The field 'description' is required", 400);
    }

    await validate(registrationLink, req.body);

    const photoName = await savePhoto(req.files.image);
    console.log(req.files.image);
    console.log(photoName);

    await connection.query(
      `
      UPDATE links
      SET url=?,title=?,description=?,image=?
      WHERE id_link=?
      `,
      [url, title, description, photoName, id]
    );

    res.send({
      status: 'OK',
      message: 'The link has been modified succesfully!!!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editLink;
