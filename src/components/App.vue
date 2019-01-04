<style src="todomvc-app-css/index.css"></style>

<template>
  <section class="todoapp">
    <!-- header -->
    <header>
      <h1>todos</h1>
      <input class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needes to be done?"
       @keyup.enter="addTodo($event)">
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input class="toggle-all" id="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)">
        <label for="toggle-all"></label>
      <ul class="todo-list">
        <TodoItem
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{remaining}}</strong>
         <!-- Vue自带的过滤器pluralize 首字母大写 -->
        {{remaining | pluralize('item')}} left
      </span>
      <ul class="filters">
        <li v-for="(val,key,index) in filters" :key="index">
          <!-- Vue自带的过滤器capitalize 首字母大写 -->
          <a :href="'#/'+ key" :class="{ selected: visibility === key }" @click="visibility = key">{{key | capitalize }}</a>
        </li>
      </ul>
       <button class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted()">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { mapActions ,mapState } from "vuex"
import TodoItem from "./TodoItem.vue"

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
};

export default {
  components: { TodoItem },
  data() {
    return {
      visibility: "all",
      filters: filters
    };
  },
  computed: {
    // todos () {
    //   return this.$store.state.todos
    // },
    allChecked () {
      return this.todos.every(todo => todo.done) //用于检测数组所有元素是否都符合指定条件（通过函数提供）
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    },
    // 映射 this.todos 为 store.state.todos
     ...mapState(['todos']) 
  },
  methods: {
   ...mapActions([
     'toggleAll',
     'clearCompleted'
   ]),
   addTodo(e) {
     const text = e.target.value
     if(text.trim()) {
       this.$store.dispatch('addTodo',text)
     }
      e.target.value = ''
   }
  },
  // Vue自带过滤器pluralize,capitalize
  filters: {
    pluralize: (n, w) => n===1 ? w :(w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
};
</script>
