const db = require("../../data/db")

function find() {
  return db("users")
  .select("id", "username")
}

function findBy(filter) {
  return db("users")
  .select("id", "username", "password")
  .where(filter)
}

function findById(id) {
  return db("users")
  .where("id", id)
  .first()
}

async function add(user) {
  const [newUser] = await db("users")
  .insert(user)
  return findById(newUser)
}

function updateUser(id, values) {
  return db("users")
  .where("id", id)
  .update(values)
}


module.exports = {
	find,
	findBy,
	findById,
	add,
  updateUser
}