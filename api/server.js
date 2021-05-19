const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const authRouter = require("./auth/auth-router")
const plantsRouter = require("./plants/plants-router")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const dbConfig = require("../data/db")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.JWT_SECRET,
  store: new KnexSessionStore({
    knex: dbConfig,
    createTable: true,
  })
}))

server.use(authRouter)
server.use(plantsRouter)


server.use((err, req, res, next) => {
	res.status(500).json({
		message: err.message,
		stack: err.stack
	})
})

server.get("/", (req,res)=> {
	res.json({
	message:"Welcome to the Water-My-Plants API",
	login: "/api/auth/login",
	register: "/api/auth/register"
	})
})


module.exports = server