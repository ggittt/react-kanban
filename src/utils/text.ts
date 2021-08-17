export const validUserName = (userName: string): boolean => {
  if (userName.length >= 2 && userName.length < 10) {
    return true
  }
  return false
}

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}