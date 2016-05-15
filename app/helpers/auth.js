export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Sean Rose',
        avatar: 'https://en.gravatar.com/userimage/64006533/136391e6c0fd6a154b8dc52fed75043f.jpg?size=200',
        uid: 'seanrose',
      })
    }, 2000)
  })
}

export function checkIfAuthed (store) {
  // ignore firebase
  // check single source of truth to see if is authed
  return store.getState().isAuthed
}

export function logout () {
  console.log('logged out!')
}