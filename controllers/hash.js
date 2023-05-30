const bcrypt = require("bcrypt");
function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return {hash,  salt,};
  }
  function verifyPassword(password, hash, salt) {
    return bcrypt.compareSync(password, hash, salt);
  }
  module.exports = {hashPassword, verifyPassword};