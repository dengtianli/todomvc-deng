export const STORAGE_KEY = 'todos-vuejs'
export const mutations = {
  addTodo (state, todo) {
    state.todos.push(todo)
  },

  removeTodo (state,todo) {
    state.todos.splice(state.todos.indexof(todo), 1) //方法向/从数组中添加/删除项目，然后返回被删除的项目。
  },
  editTodo (state,{todo ,text = todo.text, done = todo.done}) {
    todo.text =text
    todo.done =  done
  }
}