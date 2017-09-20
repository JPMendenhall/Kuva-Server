//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getSideNavBar(id) {
    return knex.from('patron')
    .select('patron.user_id', 'trip.name', 'trip.trip_id')
    .join('patron_trip', 'patron.user_id', 'patron_trip.user_id')
    .join('trip', 'trip.trip_id', 'patron_trip.trip_id')
    .where('patron.user_id', id)
  },
  getPicAndName(id) {
    return knex.from('patron')
    .select('patron.username', 'patron.profile_pic')
    .where('patron.user_id', id)
  }
}
