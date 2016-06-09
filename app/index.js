import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// import users from 'redux/modules/users'
import thunk from 'redux-thunk'
// thunk --> instead of exporting a bunch of action creators, can encapsulate them all into 1 function which handles the async dispatches (see users.js / fetchAndHandleAuthedUser)
// by returning a function, we can delay the dispatch of an action/dispatch only if certain conditions are met
import { checkIfAuthed } from 'helpers/auth'

// anything exported from index is a property on reducers obj
import * as reducers from 'redux/modules'

/*
const reducers = {} is all the reducers combined into a single obj
reducers.modal = {} =  the modal reducer
reducers.users = {} =  the users reducer
*/

// store can handle action creators (which return a function instead of an obj,and that function is passed dispatch)
// 2nd arg - is
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

function checkAuth (nextState, replace) {
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
	document.getElementById('app')
)


// connect -> connects redux to a specific react component -> 'react-redux'
// bindActionCreator / createStore / applyMiddleWare -> vanilla redux -> can do outside of context of react