const db = require("../../data/db")

function find() {
  return db("plants")
  .select("*")
}

function findBy(filter) {
  return db("plants")
  .select("*")
  .where(filter)
}

function findById(id) {
  return db("plants")
  .where("plant_id", id)
  .first()
}

function findByUser(id) {
  return db("users as u")
  .where("id", id)
  .join("plants as p", "p.user_id", "u.id")
  .select("u.username", "p.plant_id", "p.nickname", "p.species", "p.h2oFrequency", "p.user_id", "p.image")
}

function removePlant(id) {
  return db("plants")
  .where("plant_id", id)
  .del()
}

function updatePlant(id, values) {
  return db("plants")
  .where("plant_id", id)
  .update(values)
}

async function add(plant) {
  const [newPlant] = await db("plants")
  .insert(plant)
  return findById(newPlant)
}


module.exports = {
  find,
  findBy,
  findById,
  findByUser,
  removePlant,
  updatePlant,
  add
}