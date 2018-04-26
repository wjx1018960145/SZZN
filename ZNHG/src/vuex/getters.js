//getters.js 简单到不像，getters存在的意义就是 纯粹！！

export const doneTodos = state => {
  return state.todos.filter(item => item.done)
}

export const undoneTodos = state => {
  return state.todos.filter( item => !item.done)
}
