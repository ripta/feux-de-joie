/// <reference path="typings/tsd.d.ts" />

import bodyParser = require("body-parser")
import http = require("http")
import errorHandler = require("errorhandler")
import express = require("express")
import sio = require("socket.io")

import homepageRoutes = require("./routes/homepage")

var app = express()
var server = http.createServer(app)
var ioServer = sio.listen(server)

app.set("views", __dirname + "/views")
app.set("view engine", "jade")
app.set("view options", {
	layout: false
})

var bodyParsingMiddleware = bodyParser.urlencoded({
	extended: true
})
app.use(bodyParsingMiddleware)
app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"))

var env = process.env.NODE_ENV || "development"
if (env === "development") {
	var errorHandlingMiddleware = errorHandler({
		dumpExceptions: true,
		showStack: true
	})
	app.use(errorHandlingMiddleware)
} else if (env === "production") {
	app.use(errorHandler())
}

app.get("/", homepageRoutes.index)
app.get("/components/:file.html", function(req: express.Request, rsp: express.Response) {
  rsp.render(req.params.file)
})

server.on("request", function(req: http.IncomingMessage) {
  console.log(req.method + " " + req.url)
})

server.listen(3000, function() {
	console.log("feux-de-joie listening on :%d in %s mode", 3000, app.settings.env);
})
