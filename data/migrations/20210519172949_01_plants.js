exports.up = function(knex) {
  return knex.schema.createTable("plants", tbl => {
    tbl.increments("plant_id")
    tbl.text("nickname", 128)
      .notNullable()
    tbl.text("species", 128)
      .notNullable()
    tbl.integer("h2oFrequency")
      .notNullable()
    tbl.binary("image")
    tbl.integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("plants")
}