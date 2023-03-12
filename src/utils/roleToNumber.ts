// check the string of the role value

export const roleToNumber = (role: string) => {
  if (role === 'GUEST') {
    return 1
  } else if (role === 'MEMBER') {
    return 2
  } else if (role === 'PARTNER') {
    return 3
  } else if (role === 'ADMIN') {
    return 4
  } else {
    return 0
  }
}
