import { bindActionCreators } from 'redux'
import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'


// takes in state
function mapStateToProps ({modal, users}) {
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
	return bindActionCreators(modalActionCreators, dispatch)
}

export default connect (
	mapStateToProps,
	mapDispatchToProps,
	)(Modal)