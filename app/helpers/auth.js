import { ref } from 'config/constants'
import { formatUserInfo } from 'helpers/utils'
import { authUser, fetchingUserSuccess } from 'redux/modules/users'

export default function auth () {
  // this will return a promise w/ user's fb info
  return ref.authWithOAuthPopup('facebook')
}

export function checkIfAuthed (store) {
  const authData = ref.getAuth()
  if (authData === null) {
    // then not authenticated
    return false
  } else if (store.getState().users.isAuthed === false) {
    const { uid, facebook } = authData
    const userInfo = formatUserInfo(facebook.displayName, facebook.profileImageURL, uid)
    store.dispatch(authUser(uid))
    store.dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
  }
  // ignore firebase
  // check single source of truth to see if is authed
  return true
}

export function logout () {
  ref.unauth()
}

// want to call this when we authenticate
export function saveUser (user) {
  // grab our firebase ref -> go to the user id url, set the user obj at that id
  return ref.child(`users/${user.uid}`)
    // this will
    .set({user})
    .then(() => user)
}