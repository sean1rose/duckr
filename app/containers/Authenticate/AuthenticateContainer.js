import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
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
    authUser: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    fetchingUserFailure: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
  },
  handleAuth () {
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
function mapStateToProps (state) {
  console.log('state - ', state)
  return {
    isFetching: state.isFetching,
    error: state.error,
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
// connect returns a function, and that function that returns accepts AuthenticateContainer as its 1st arg

/*
AuthContainer uses 'isFetching' and 'error'  <--> connect to <--> redux state
*/