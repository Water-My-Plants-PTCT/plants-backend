const jwt = require("jsonwebtoken")
const User = require("../auth/auth-model")

const restricted = async (req, res, next) => {

  try {
    const token = req.cookies.token
      if(!token) {
        res.status(401).json({message: "Token required"})
      }
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({message: "Token invalid"})
        }
  
        req.token = decoded
        next()
      })
  
    } catch(err) {
      next(err)
    }
}


const checkUsernameDups = (req, res, next) => {
  const username = req.body.username
  User.findBy({username}).first()
    .then(existingUser => {
      if (existingUser) {
      return res.status(401).json({message: "Username already taken"})

    } else {
      req.existingUser = existingUser
      next()
  }}
  )
}

const checkPhoneDups = (req, res, next) => {
  const phone = req.body.phone
  User.findBy({phone}).first()
    .then(existingUser => {
      if (existingUser) {
      return res.status(401).json({message: "Phone number already taken"})

    } else {
      req.existingUser = existingUser
      next()
  }}
  )
}

const checkBodyValid = (req, res, next) => {
  if (!req.body.username 
    || !req.body.password 
    || !req.body.phone
    || req.body.phonelength < 10 
    || typeof req.body.username !== "string" || req.body.username.length < 3) {
    
      res.status(401).json({message: "Username and Password required or incorrect values"})
  
    } else {
    next()
  }
}

const plantBodyValid = (req, res, next) => {
  if (!req.body.nickname || !req.body.species || !req.body.h2oFrequency) {
    res.status(401).json({message: "Nickname, Species, and h2oFrequency (number of days as integer) required"})
  } else {
    next()
  }
}


const checkUserExists = (req, res, next) => {
  const id = req.params.id
  User.findBy({id}).first()
    .then(existingUser => {
      if (existingUser) {
      next()

    } else {
      res.status(401).json({message: "Could not locate a user by that specific ID"})
  }}
  )
}


module.exports = {
  restricted,
  checkUsernameDups,
  checkPhoneDups,
  checkBodyValid,
  plantBodyValid,
  checkUserExists
}