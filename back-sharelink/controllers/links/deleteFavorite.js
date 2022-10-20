const getDb = require('../../db/db');
const deleteFavorite = async (req, res, next) => {
  let connection;
  try {
    connection = await getDb();
    const { id } = req.params;
    console.log(id);
    await connection.query(
      `
    DELETE
    FROM favorites
    WHERE id_favorite=? 
    `,
      [id]
    );
    res.send({
      status: 'ok',
      message: 'The favorite has been deleted successfully',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deleteFavorite;
