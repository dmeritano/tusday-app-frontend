const validPassword = (password) => {
  const MIN_LENGHT = 6
  const letterNumber = /^[A-Za-z0-9]*$/

  if (letterNumber.test(password)) {
    if (password.length >= MIN_LENGHT) {
      return true
    }
  }
  return false
}

const formatDate = date => {
  const newDate = new Date(date.split('T')[0].split('-'))
  const options = {
    year:'numeric',
    month:'long',
    day:'numeric'
  }
  return newDate.toLocaleDateString("en", options)
}

export { validPassword, formatDate }
