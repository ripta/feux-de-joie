/// <reference path="typings/tsd.d.ts" />

import express = require("express")
import http = require("http")
import bodyParser = require("body-parser")
import errorHandler = require("errorhandler")

import homepageRoutes = require("./routes/homepage")

var app = express()

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
