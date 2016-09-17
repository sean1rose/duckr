// duck action creators...

const FETCHING_DUCK = 'FETCHING_DUCK'
const FETCHING_DUCK_ERROR = 'FETCHING_DUCK_ERROR'
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS'
const ADD_DUCK = 'ADD_DUCK'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

function fetchingDuck () {
	return {
		type: FETCHING_DUCK,
	}
}

function fetchingDuckError (error) {
	return {
		type: FETCHING_DUCK_ERROR,
		error: 'Error fetching Duck',
	}
}

function fetchingDuckSuccess (duck) {
	return {
		type: FETCHING_DUCK_SUCCESS,
		duck,
	}
}

function addDuck (duck) {
	return {
		type: ADD_DUCK,
		duck,
	}
}

function addMultipleDucks (ducks) {
	return {
		type: ADD_MULTIPLE_DUCKS,
		ducks,
	}
}

export function duckFanout (duck) {
	return function (dispatch, getState) {
		const uid = getState.users.authedId
		saveDuck(duck)
			.then((duckWithID) => {
				dispatch(addDuck(duckWithID))
				dispatch(closeModal())
				dispatch(addSingleUsersDuck, duckWithID.duckID)
			})
			.catch((err) => {
				console.warn('Error in duckFanout', err)
			})
	}
}

// function removeFetching ()

const initialState = {
	isFetching: true,
	error: '',
}

export default function ducks (state = initialState, action) {
	switch (action.type) {
		case FETCHING_DUCK :
			return {
				...state,
				isFetching: true,
			}
		case ADD_DUCK :
		case FETCHING_DUCK_SUCCESS:
			return {
				...state,
				error: '',
				isFetching: false,
				[action.duck.duckId]: action.duck,
			}
		case FETCHING_DUCK_ERROR :
			return {
				...state,
				isFetching: false,
				error: action.error,
			}
		case REMOVE_FETCHING :
			return {
				...state,
				error: '',
				isFetching: false,
			}
		case ADD_MULTIPLE_DUCKS :
			return {
				...state,
				...action.ducks,
			}
		default :
			return state
	}
}