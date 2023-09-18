const knexfile = require("../database/knexfile");

module.exports = require("knex")(knexfile["local"]);