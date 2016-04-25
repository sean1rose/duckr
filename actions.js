// reference file
// 3 phases of API call: 1) making the request, 2a) request failed, 2b) request succeeded

// taken every action, click, data update, etc and represented those actions as objects in this file


// USER ACTIONS
{
	type: AUTH_USER,
	uid,
}

{
	type: UNAUTH_USER,
}

{
	type: FETCHING_USER,
}

{
	type: FETCHING_USER_FAILURE,
	error: 'Error fetching user'
}

// whenever fetch user -> add to user store
{
	type: FETCHING_USER_SUCCESS,
	uid,
	user,
	timestamp,
}


// DUCK ACTIONS
{
	type: FETCHING_DUCK,
}

{
	type: FETCHING_DUCK_ERROR,
	error: 'Error fetching duck'.
}

{
	type: FETCHING_DUCK_SUCCESS,
	duck,
}

{
	type: REMOVE_FETCHING,
}

{
	type: ADD_DUCK,
	duck,
}

{
	type: ADD_MULTIPLE_DUCKS,
	ducks
}


// FEED ACTIONS
{
	type: SETTING_FEED_LISTENER,
}

{
	type: SETTING_FEED_LISTENER_ERROR,
	error: 'Error fetching feeds.',
}

{
	type: SETTING_FEED_LISTENER_SUCCESS,
	duckIds,
}

{
	type: ADD_NEW_DUCK_ID_TO_FEED,
	duckId,
}

{
	type: RESET_NEW_DUCKS_AVAILABLE,
}


// LISTENERS
{
	type: ADD_LISTENER,
	listenerId,
}


// MODAL
{
	type: OPEN_MODAL,
}

{
	type: CLOSE_MODAL,
}

{
	type: UPDATE_DUCK_TEXT,
	newDuckText,
}


// REPLIES
{
	type: FETCHING_REPLIES,
}

{
	type: FETCHING_REPLIES_ERROR,
	error: 'Error fetching replies',
}

{
	type: FETCHING_REPLIES_SUCCESS,
	replies,
	duckId,
	lastUpdated: Date.now(),
}

{
	type: ADD_REPLY,
	duckId,
	reply,
}

{
	type: ADD_REPLY_ERROR,
	error: 'Error adding reply',
}

{
	type: REMOVE_REPLY,
	replyId,
}


// LIKECOUNT
{
	type: FETCHING_COUNT,
}

{
	type: FETCHING_COUNT_ERROR,
	error: 'Error fetching duck\'s like count',
}

{
	type: FETCHING_COUNT_SUCCESS,
	duckId,
	count,
}


// USERS DUCKS
{
	type: FETCHING_USERS_DUCKS,
	uid,
}

{
	type: FETCHING_USERS_DUCKS_ERROR,
	error: 'Error fetching users duck ids',
}

{
	type: FETCHING_USERS_DUCKS_SUCCESS,
	uid,
	duckIds,
	lastUpdated,
}

// if already fetched users ducks and cached, can add duck to users cache so stays up to date
{
	type: ADD_SINGLE_USERS_DUCK,
	uid,
	duckIds,
	lastUpdated
}


// USERSLIKES
{
	type: FETCHING_LIKES,
}

{
	type: FETCHING_LIKES_ERROR,
	error: 'Error fetching likes',
}

{
	type: FETCHING_LIKES_SUCCESS,
	likes,
}

{
	type: ADD_LIKE,
	duckId,
}

{
	type: REMOVE_LIKE,
	duckId,
}