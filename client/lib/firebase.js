export const signInFirebase = (fire, email, password) => {
  return fire.auth.signInWithEmailAndPassword(email, password)
}

// signUpFirebase is a function that returns a promise
export const signUpFirebase = (fire, email, password) => {
  return fire.auth.createUserWithEmailAndPassword(email, password)
}
