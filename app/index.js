import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import users from 'redux/modules/users'
import thunk from 'redux-thunk'
// thunk --> instead of exporting a bunch of action creators, can encapsulate them all into 1 function which handles the async dispatches (see users.js / fetchAndHandleAuthedUser)

// store can handle action creators (which return a function instead of an obj,and that function is passed dispatch)
// 2nd arg - is
const store = createStore(users, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
	document.getElementById('app')
)
