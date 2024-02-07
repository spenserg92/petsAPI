// import dependencies
const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pets
const Pet = require('../models/pet')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

///////////////////////////////////////////////////////
// routes go here 
///////////////////////////////////////////////////////

// CREATE
// POST /toys/oiu32458098sdf903rjknew
router.post('/toys/:petId', removeBlanks, (req, res, next) => {
	// save the toy from the request body
    const toy = req.body.toy
    // save the petId for easy ref
    const petId = req.params.petId

	Pet.findById(petId)
		// make sure we have a pet
        .then(handle404)
		.then((pet) => {
            pet.toys.push(toy)

			return pet.save()
		})
        .then(pet => res.status(201).json({ pet: pet }))
		.catch(next)
})

// UPDATE
// PATCH /toys/5a7db6c74d55bc51bdf39793/546sf456dfs645dfs4894sdf4
router.patch('/toys/:petId/:toyId', requireToken, removeBlanks, (req, res, next) => {
	// let's grab both ids from req.params
    const { petId, toyId } = req.params

	Pet.findById(petId)
		.then(handle404)
		.then((pet) => {
			// single out the toy
            const theToy = pet.toys.id(toyId)
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, pet)

            // update the existing toy
            theToy.set(req.body.toy)

			// pass the result of Mongoose's `.update` to the next `.then`
			return pet.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /toys/5a7db6c74d55bc51bdf39793/546sf456dfs645dfs4894sdf4
router.delete('/toys/:petId/:toyId', requireToken, removeBlanks, (req, res, next) => {
	// let's grab both ids from req.params
    const { petId, toyId } = req.params

	Pet.findById(petId)
		.then(handle404)
		.then((pet) => {
			// single out the toy
            const theToy = pet.toys.id(toyId)
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, pet)

            // update the existing toy
            theToy.deleteOne()

			// pass the result of Mongoose's `.update` to the next `.then`
			return pet.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router