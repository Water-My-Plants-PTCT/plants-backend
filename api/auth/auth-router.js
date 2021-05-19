const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("./auth-model")
const mw = require("../middleware/index")
require('dotenv').config()

router.post('/api/auth/register', mw.checkUsernameDups, mw.checkPhoneDups, mw.checkBodyValid, async (req, res, next) => {
  try {
    const { username, phone, password } = req.body
    const hash =  8
    const registerUser = await db.add({
      username,
      phone,
      password: await bcrypt.hashSync(password, hash),
    })
      if (registerUser) {
        res.status(200).json(registerUser)  
    } else {
        res.status(401).json({message: "Unable to register user"})
    }
    } catch(err) {
      next(err)
    }
  })

router.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
    
  db.findBy({username}).first()
    .then(user => {   
      if(user && bcrypt.compareSync(password, user.password)) {
      console.log(user)       
      const token = jwt.sign({
        userID: user.id,
        username: user.username,
        expiresIn: "30d",
      }, process.env.JWT_SECRET)//see admin for JWT secret

        res.cookie("token", token)
        res.status(200).json({
        message: `Welcome back ${req.body.username}`,
      })  
    } else {
      return res.status(401).json({message: "error invalid credentials"})
    }
  })
    .catch(err => {
      console.log(err)
      return res.status(401).json({message: "Unable to log in user..."})
    })
  })


router.put("/api/auth/users/:id", async (req, res, next) => {
  try {
    const hash = 8
    const newPassword = await bcrypt.hashSync(req.body.password, hash)
    const updatedUser = await db.updateUser(req.params.id, {username: req.body.username, password: newPassword})
      if (!updatedUser) {
        return res.status(404).json({message: "No users for that specific id"})
    }
      
      res.status(200).json({message: `${req.body.username}'s info has been updated`})
    
    } catch(err) {
      next(err)
  }
})




module.exports = router