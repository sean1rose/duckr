import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
// import auth from 'helpers/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { fetchingUserSuccess, authUser, unauthUser, etc...} from 'redux/modules/users'
// ===
import * as userActionCreators from 'redux/modules/users'
// ^ grabs everything exported from users and lumps into userActionCreators
console.log('userActionCreators - ', userActionCreators)

// want to connect this container to redux store -> use connect
const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  handleAuth (e) {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace('feed'))
    // fetchAndHandleAuthedUser is composed of 4 diff action creators -> it returns a promise
    // we've removed logic from container and moved into users.js file using thunk
    // then want to redirect to our new feed route
  },
  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth} />
    )
  },
})

// specify which specific part of the state that AuthenticateContainer cares about...
function mapStateToProps ({users}) {
  // console.log('state - ', state)
  return {
    isFetching: users.isFetching,
    error: users.error,
  }
}

// convenience method which allows us to bind dispatch to obj that has action creators on it
function mapDispatchToProps (dispatch) {
  // pass an obj whos values are action creators
  return bindActionCreators(userActionCreators , dispatch)
}


// this connects our container to redux store...
// (1st arg - specifies which part of the state the component needs)
// 2nd arg - convenience method which allows us to bind dispatch to obj that has action creators on it
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticateContainer)
// connect returns a function, and the function that it returns accepts AuthenticateContainer as its 1st arg

/*
AuthContainer uses 'isFetching' and 'error'  <--> connect to <--> redux state
*/