
export const LSGetUser = () => {
  const LSUser = localStorage.getItem('userName')
  return LSUser ? LSUser : ''
}
export const LSSetUser = (data: string) => {
  localStorage.setItem('userName', data)
}

export const LSGetColumns = () => {
  const LSUser = localStorage.getItem('columns')
  return LSUser ? JSON.parse(LSUser) : []
}
export const LSSetColumns = (data: object) => {
  localStorage.setItem('columns', JSON.stringify(data))
}

export const LSGetTasks = () => {
  const LSUser = localStorage.getItem('tasks')
  return LSUser ? JSON.parse(LSUser) : []
}
export const LSSetTasks = (data: object) => {
  localStorage.setItem('tasks', JSON.stringify(data))
}

export const LSGetComments = () => {
  const LSUser = localStorage.getItem('comments')
  return LSUser ? JSON.parse(LSUser) : []
}
export const LSSetComments = (data: object) => {
  localStorage.setItem('comments', JSON.stringify(data))
}