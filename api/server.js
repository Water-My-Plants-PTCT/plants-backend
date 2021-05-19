const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())


server.use((err, req, res, next) => {
	res.status(500).json({
		message: err.message,
		stack: err.stack
	})
})

server.get("/", (req,res)=> {
	res.json({api:"up"})
})
module.exports = server