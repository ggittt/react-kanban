export const generateId = (): string => {
  return (Date.now() + Math.floor(Math.random() * 100)).toString()
}