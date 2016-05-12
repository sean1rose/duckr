// dux organization method -> combine actions w/ reducer in same file...
// so everytime user state changes, it happens somewhere in this file

// define ACTION-TYPES (define first because sometimes want to export these constants so other reducers can use them as well)
const AUTH_USER = "AUTH_USER"
const UNAUTH_USER = "UNAUTH_USER"
const FETCHING_USER = "FETCHING_USER"
const FETCHING_USER_FAILURE = "FETCHING_USER_FAILURE"
const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS"

// User ACTION-CREATORS
export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}
/*
dispatch(authUser('SeanRose'))
===
dispatch({
  type: AUTH_USER,
  'SeanRose'
})
*/


export function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

export function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

export function fetchingUserFailure (error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user',
  }
}

// whenever fetch user -> add to user store
export function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

// user INITIAL STATE
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: ''
  }
}

// user REDUCER
function user(state = initialUserState, action){
  switch (action.type){
    case 'FETCHING_USER_SUCCESS':
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: ''
}

export default function users (state = initialState, action){
  switch (action.type){
    case 'AUTH_USER':
      // return Object.assign({}, state, {
      //  isAuthed: true,
      //  authedId: action.uid
      // })
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid
      }
    case 'UNAUTH_USER':
      return {
        ...state,
        isAuthed: false,
        authedId: ''
      }
    case 'FETCHING_USER':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCHING_USER_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case 'FETCHING_USER_SUCCESS':
      return action.user === null
        ? {
          ...state,
          error: '',
          isFetching: false
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          // [action.uid]: {
          //  lastUpdated: action.timestamp,
          //  info: action.user
          // }
          // USER COMPOSITION - user func only takes part of the state --> state[action.uid]
          // only takes a part of the state --> aka the user id property on state tree
          [action.uid]: user(state[action.uid], action)
        }
    default:
      return state
  }
}