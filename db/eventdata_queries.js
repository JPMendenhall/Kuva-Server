//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getEventData(id) {
    return knex.from('trip')
    .select('trip.name', 'trip.start_date', 'trip.end_date')
    .where('trip.trip_id', id)
  },
  getPatronsPics(id) {
    return knex.from('patron')
    .select('patron.profile_pic', 'patron.instagram_key')
    .join('patron_trip', 'patron.user_id', 'patron_trip.user_id')
    .join('trip', 'trip.trip_id', 'patron_trip.trip_id')
    .where('trip.trip_id', id)
  }
}
