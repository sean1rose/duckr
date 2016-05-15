import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// connect conenect redux to a particular react component
import { Logout } from 'components'
import { logoutAndUnauth } from 'redux/modules/users'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  },
  render () {
    return (
      <Logout />
    )
  },
})

// connecting the container allows it to receive dispatch as 1 of it's props, meaning u can call the actioncreator
export default connect()(LogoutContainer)