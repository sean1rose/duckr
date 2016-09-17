// feed action creators

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'const SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

function settingFeedListener () {
	return {
		type: SETTING_FEED_LISTENER,
	}
}

function settingFeedListenerError (error) {
	return {
		type: SETTING_FEED_LISTENER_ERROR,
		error: 'Error fetching feeds.',
	}
}

function settingFeedListenerSuccess (duckIds) {
	return {
		type: SETTING_FEED_LISTENER_SUCCESS,
		duckIds,
	}
}

function addNewDuckIdToFeed (duckId) {
	return {
		type: ADD_NEW_DUCK_ID_TO_FEED,
		duckId,
	}
}

function resetNewDucksAvailable () {
	return {
		type: RESET_NEW_DUCKS_AVAILABLE,
	}
}

const initialState = {
	isFetching: false,
	newDucksAvailable: false,
	newDucksToAdd: [],
	error: '',
	duckIds: [],
}

export function feed (state, action) {
	switch (action.type) {
		case SETTING_FEED_LISTENER:
			return {
				...state,
				isFetching: true,
			}
		case SETTING_FEED_LISTENER_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.error,
			}
		case SETTING_FEED_LISTENER_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: '',
				duckIds: action.duckIds,
			}
		case ADD_NEW_DUCK_ID_TO_FEED:
			return {
				...state,
				newDucksToAdd: [action.duckId, ...state.newDucksToAdd]
			}
		case RESET_NEW_DUCKS_AVAILABLE:
			return {
				...state,
				duckIds: [...state.newDucksToAdd, ...state.duckIds],
				newDucksToAdd: [],
				newDucksAvailable: false,
			}
		default:
			return state
	}
}