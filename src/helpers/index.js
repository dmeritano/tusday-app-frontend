const validPassword = (password) => {
  const MIN_LENGHT = 6
  const letterNumber = /^[A-Za-z0-9]*$/

  //console.log("Funca?:" + letterNumber.test(password))
  //console.log("Match?:" + password.match(password))

  if (letterNumber.test(password)) {
    if (password.length >= MIN_LENGHT) {
      return true
    }
  }
  return false
}

export { validPassword }
