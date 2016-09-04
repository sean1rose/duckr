// Saving changes to firebase schema
// takes in a duck, generate random duckId (using fb) then save the duck (w/ id) to various firebase endpoints

import from { ref } from 'config/constants'


// save to ducks endpoint
function saveToDucks (duck) {
	// want to generate random duck id using firebase
	const duckId = ref.child('ducks').push().key
	// push data to firebase, but not necessarily pushing data, but just returning a reference to the specific location we pushed to, and that reference has a .key property onit

	// pushing to the randomly generated duckId endpt, 
	// want to push to firebase the duck + duckId
	// basically creating the duckId then pushing to firebase
	const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})
	// spread operator -> create a brand new object that has all of the properties of duck along w/ the duck Id

	return {
		duckId,
		duckPromise
	}
}

// save duck to usersDucks entpt
function saveToUserDucks (duck, duckId) {
	return ref.child(`usersDucks/${duck.uid}/${duckId}`)
		.set({...duck, duckId})
}

// save to usersLikes endpoint
function saveLikeCount (duckId) {
	return ref.child(`likecount/${duckId}`)
		.set(0)
}

// wrap the above 4 functions
function saveDuck (duck) {
	// we are assuming saveToDucks will return a random duckId for us
	const { duckId, duckPromise } = saveToDucks(duck)

	// want to capture all the invocations of the async functions above
	return Promise.all([
		duckPromise,
		saveToUserDucks(duck, duckId),
		saveLikeCount(duckId),
	]).then(() => ({...duck, duckId}))
	// returns obj w/ duck and duckId

}