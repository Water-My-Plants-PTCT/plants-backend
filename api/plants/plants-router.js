const router = require("express").Router()
const db = require("./plants-model")
const mw = require("../middleware/index")

//gets a list of all plants in database
router.get("/api/plants", async (req, res, next) => {
  try {
    const allPlants = await db.find()
    res.json(allPlants)
  } catch(err) {
    next(err)
  }
})

//gets a specific plant based on the ID
router.get("/api/plants/:id", async (req, res, next) => {
  try {
    const plants = await db.findById(req.params.id)
      if (!plants) {
        return res.status(404).json({message: "No plants for that specific id"})
    }
      res.json(plants)

    } catch(err) {
      next(err)
  }
})

//creates a new plant and returns an object
router.post("/api/plants", mw.plantBodyValid, async (req, res, next) => {
  try {
    const newPlant = await db.add(req.body)
    res.status(201).json(newPlant)
  } catch(err) {
    next(err)
  }
})

//updates an existing plants values
router.put("/api/plants/:id", async (req, res, next) => {
  try {
    const updatedPlant = await db.updatePlant(req.params.id, req.body)
      if (!updatedPlant) {
        return res.status(404).json({message: "No plants for that specific id"})
    }
      res.json(updatedPlant)
  
    } catch(err) {
    next(err)
  }
})

//deletes and removes an existing plant from the database
router.delete("/api/plants/:id", async (req, res, next) => {
  try {
    const deletedPlant = await db.removePlant(req.params.id)
      if (!deletedPlant) {
        return res.status(404).json({message: "No plants for that specific id"})
      }
      res.status(200).json({message: `Plant with id ${req.params.id} has been deleted`})

    } catch(err) {
      next(err)
    }
})



module.exports = router