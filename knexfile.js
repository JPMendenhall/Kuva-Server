// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/kuva-server'
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
};
