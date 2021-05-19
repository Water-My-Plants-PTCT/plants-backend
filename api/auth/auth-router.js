const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("./auth-model")
const mw = require("../middleware/index")

router.post('/api/auth/register', mw.checkUsernameDups, mw.checkBodyValid, async (req, res, next) => {
  try {
    const { username, phone_number, password } = req.body
    const hash = 8
    const registerUser = await db.add({
      username,
      phone_number,
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
      }, "keep it secret keep it safe")

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


router.get("/api/auth/logout", async (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(200).json({message: "no session"})
    
    } else {
      req.session.destroy(err => {
        
        if (err) {
          next(err)
        
        } else {
          res.status(200).json({message: "logged out! see you next time"})
        }}
      )}
    
    } catch(err) {
      next(err)
  }
})



module.exports = router