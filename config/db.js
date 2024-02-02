'use strict'
// allow for grabbing stuff from env
require('dotenv').config()

// creating a base name for the mongodb
// REPLACE THE STRING WITH YOUR OWN DATABASE NAME
// const mongooseBaseName = 'applePiePetsApp'

// create the mongodb uri for development and test
// this code is for a local instance of mongodb
// const database = {
// 	development: `mongodb://localhost/${mongooseBaseName}-development`,
// 	test: `mongodb://localhost/${mongooseBaseName}-test`,
// }

// This code is for an atlas instance of mongodb
const database = {
	development: process.env.MONGODB_URI,
	test: process.env.MONGODB_URI,
}

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development

// Environment variable MONGODB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.MONGODB_URI || localDb

module.exports = currentDb