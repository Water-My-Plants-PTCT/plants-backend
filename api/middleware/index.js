const jwt = require("jsonwebtoken")
const User = require("../auth/auth-model")

const restricted = async (req, res, next) => {
  try {
    const token = req.cookies.token
      if(!token) {
        res.status(401).json({message: "Token required"})
      }
  
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
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


const checkBodyValid = (req, res, next) => {
  if (!req.body.username 
    || !req.body.password 
    || !req.body.phone_number
    || req.body.phone_number.length < 10 
    || typeof req.body.username !== "string" || req.body.username.length < 3) {
    
      res.status(401).json({message: "Username and Password required or incorrect values"})
  
    } else {
    next()
  }
}


module.exports = {
  restricted,
  checkUsernameDups,
  checkBodyValid
}