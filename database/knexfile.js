// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  local: {
    client: 'postgresql',
    connection: {
      database: 'course_db',
      user:     'course_svc',
      password: 'password',
      host: 'localhost',
      port: 54320
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};