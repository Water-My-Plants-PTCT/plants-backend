exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test', password: "test", phone_number: '555-555-6666'},
        {username: 'daniel', password: "daniel", phone_number: '480-555-6666'},
      ])
    })
}
