/// <reference path="typings/tsd.d.ts" />

import bodyParser = require("body-parser")
import errorHandler = require("errorhandler")
import express = require("express")
import http = require("http")
import logger = require("morgan")
import sio = require("socket.io")

import homepageRoutes = require("./routes/homepage")

var app = express()
var server = http.createServer(app)
var ioServer = sio.listen(server)

//ioServer.set("log level", 1000)

app.engine("jade", (path, options, next) => {
  options.doctype = "html"
  require("jade").__express(path, options, next)
})
app.set("view engine", "jade")
app.set("views", __dirname + "/views")

var bodyParsingMiddleware = bodyParser.urlencoded({
	extended: true
})
app.use(bodyParsingMiddleware)
app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"))

if (app.settings.env === "development") {
	var errorHandlingMiddleware = errorHandler({
		dumpExceptions: true,
		showStack: true
	})
  app.use(logger("dev"))
	app.use(errorHandlingMiddleware)
} else if (app.settings.env === "production") {
	app.use(logger("combined"))
  app.use(errorHandler())
}

app.get("/", homepageRoutes.index)
app.get("/components/:file.html", (req: express.Request, rsp: express.Response) => {
  rsp.render("components/" + req.params.file)
})

server.listen(3000, () => {
	console.log("feux-de-joie listening on :%d in %s mode", 3000, app.settings.env);
})
