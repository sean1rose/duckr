// dux organization method -> combine actions w/ reducer in same file...
// so everytime user state changes, it happens somewhere in this file

import auth, { logout } from 'helpers/auth'

// define ACTION-TYPES (define first because sometimes want to export these constants so other reducers can use them as well)
const AUTH_USER = "AUTH_USER"
const UNAUTH_USER = "UNAUTH_USER"
const FETCHING_USER = "FETCHING_USER"
const FETCHING_USER_FAILURE = "FETCHING_USER_FAILURE"
const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS"

// ACTION-CREATORS
function authUser (uid) {
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

function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user',
  }
}

// whenever fetch user -> add to user store
function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

// MAIN ACTION CREATOR that dispatches several action creators over time
// action creators usually return an obj, BUT THIS ONE doesn't - it returns a function that returns a bunch of action creators)
export function fetchAndHandleAuthedUser () {
    /*
    // as async event is occurring, we are dispatching actions to update the  state about where in the lifecycle of the event we're at
    // 1. dispatch fetchingUser action creator -> find action in reducer 'FETCHING_USER' -> that will modify 'isFetching' state to true
    this.props.fetchingUser()
    // so now state prop 'isFetching' is set to 'true'
    auth().then((user) => {
      // want to inform redux store that we have an authenticated user...
      console.log('Authed user', user)
      // 2. dispatch other actions upon success -> updates state by creating new authed user
      this.props.fetchingUserSuccess(user.uid, user, Date.now())
      this.props.authUser(user.uid)
    })
    .catch((error) => this.props.fetchingUserFailure(error))
    // SUMMARY: to update state -> dispatch invocation of action creators, which call reducer function via type -> return brand new state
    */
  // action creator returns a function instead of an object, allowing us to pass in dispatch as an argument
  return function (dispatch) {
    dispatch(fetchingUser())
    // so now state prop 'isFetching' is set to 'true'
    return auth().then((user) => {
      // want to inform redux store that we have an authenticated user...
      console.log('Authed user', user)
      // 2. dispatch other actions upon success -> updates state by creating new authed user
      dispatch(fetchingUserSuccess(user.uid, user, Date.now()))
      dispatch(authUser(user.uid))
    })
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unauthUser)
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