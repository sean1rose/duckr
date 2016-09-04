// When a Container-component  doesn't have any state/lifecycle events...
// ...you don't have to create a react component, you can just pass props to the actual component (using mapStateToProps)

import { bindActionCreators } from 'redux'
import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'


// this is so that modal component receives props
function mapStateToProps ({modal, users}) {
// takes in state
	const duckTextLength = modal.duckText.length

	// returns the props that are passed to ModalContainer
	return {
		user: users[users.authedId] ? users[users.authedId].info : {},
		duckText: modal.duckText,
		isOpen: modal.isOpen,
		isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140
	}
}

function mapDispatchToProps (dispatch, props) {
	// action creators that are bound to dispatch
	return bindActionCreators(modalActionCreators, dispatch)
}

// CONNECT connects a react compomnent to a redux store
// 
export default connect (
	mapStateToProps,
	mapDispatchToProps,
	)(Modal)