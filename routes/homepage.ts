/// <reference path="../typings/tsd.d.ts" />

import express = require("express")

export function index(req: express.Request, rsp: express.Response) {
	var locals = {
		title: "Feux de Joie!",
    users: []
	}
	rsp.render("index", locals)
}
