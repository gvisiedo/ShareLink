const getDB = require('../../db/db');
const getFavorite = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const [result] = await connection.query(
      `
    SELECT id_favorite,favorites.id_link,links.title,links.image,links.description,links.url
    FROM favorites
    INNER JOIN links ON (links.id_link = favorites.id_link)
    WHERE favorites.id_user = ?
    `,
      [req.Auth.id]
    );

    res.send({
      status: 'ok',
      message: 'The favorites',
      result: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getFavorite;
