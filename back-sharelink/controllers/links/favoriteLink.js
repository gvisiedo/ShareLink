const getDB = require('../../db/db');
const { generateError } = require('../../helpers');
const favoriteLink = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.body;

    const [existFavorite] = await connection.query(
      `
    SELECT id_link
    FROM favorites
    WHERE id_link = ? AND id_user = ?
    `,
      [id, req.Auth.id]
    );

    if (existFavorite.length > 0) {
      generateError('The link is already added to your favorite list', 409);
    }

    await connection.query(
      `
    INSERT INTO favorites (id_link,id_user)
    VALUES(?,?)
    
    `,
      [id, req.Auth.id]
    );

    res.send({
      status: 'ok',
      message: 'has been added to ypour favorites list',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = favoriteLink;
