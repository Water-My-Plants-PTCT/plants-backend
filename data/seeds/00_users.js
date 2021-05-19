exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test', password: "$2a$08$H9RXDNRZeOd.78WzWOR0I..IbaCrpLrsqHScIxkdw4.W/r1jaUUEe", phone: '555-555-6666'},
        {username: 'bob', password: "$2a$08$H9RXDNRZeOd.78WzWOR0I..IbaCrpLrsqHScIxkdw4.W/r1jaUUEe", phone: '480-555-6666'},
      ])
    })
}
