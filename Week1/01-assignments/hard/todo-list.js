/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = []
  }

  getAll() {
    return this.todos;
  }

  get(indexOfTodo) {
    const todo = this.todos[indexOfTodo];
    return todo ? todo : null;
  }

  add(todo) {
    this.todos.push(todo)
  }

  update(index, updatedTodo) {
    const todo = this.todos[index];
    if(todo) {
      this.todos[index] = updatedTodo;
    }
  }

  remove(indexOfTodo) {
    this.todos.splice(indexOfTodo, 1);
  }

  clear() {
    this.todos = []
  }
}

module.exports = Todo;
