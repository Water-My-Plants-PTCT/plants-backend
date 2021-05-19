exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("user_id")
    tbl.text("username", 128)
      .unique()
      .notNullable()
    tbl.text("password", 128)
      .notNullable()
    tbl.text("phone_number")
      .unique()
      .notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
}