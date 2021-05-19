const db = require("../../data/db")

function find() {
  return db("users")
  .select("user_id", "username")
}

function findBy(filter) {
  return db("users")
  .select("user_id", "username", "password")
  .where(filter)
}

function findById(id) {
  return db("users")
  .where("user_id", id)
  .first()
}

async function add(user) {
  const [newUser] = await db("users")
  .insert(user)
  return findById(newUser)
}


module.exports = {
	find,
	findBy,
	findById,
	add,
}