exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {nickname: 'Vuylstekeara', species: "Cambria Orchid", h2oFrequency: 7, image: "https://thumbs.dreamstime.com/z/cambria-orchid-plant-blooming-white-38131910.jpg", user_id: 1},
        {nickname: 'Miranda', species: "Aloe Barbadensis", h2oFrequency: 14, image: "https://images.unsplash.com/photo-1567689265664-1c48de61db0b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80", user_id: 1},
      ])
    })
}