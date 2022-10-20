const listLink = require('./listLink');
const newLink = require('./newLink');
const getLink = require('./getLinks');
const deleteLink = require('./deleteLink');
const voteLink = require('./voteLink');
const editLink = require('./editLink');
const editVote = require('./editVote');
const deleteVote = require('./deleteVote');
const ownerLink = require('./ownerLink');
const favoriteLink = require('./favoriteLink');
const getFavorite = require('./getFavorite');
const deleteFavorite = require('./deleteFavorite');

module.exports = {
  newLink,
  listLink,
  getLink,
  deleteLink,
  voteLink,
  editLink,
  editVote,
  deleteVote,
  ownerLink,
  favoriteLink,
  getFavorite,
  deleteFavorite,
};
