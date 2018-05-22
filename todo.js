//If storage space doesn't exist
if(localStorage.getItem("todoitems")==null){
    let placeholder = []
    localStorage.setItem("todoitems", JSON.stringify(placeholder))
}

function random(to){
  return Math.floor(Math.random() * to)
}

//Push to local storage
function pushToStorage(data){
    localStorage.setItem("todoitems", JSON.stringify(data))
}

//Pull from local storage
function pullFromStorage(){
    return JSON.parse(localStorage.getItem("todoitems"))
}

//Angular module
angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    //Pulls from local storage
    todoList.todos = pullFromStorage()

    window.addEventListener('devicemotion', function(){
      const xGravity = event.accelerationIncludingGravity.x
    
      if(xGravity > 10){
        alert(todoList.todos[random(todoList.todos.length)])
        navigator.vibrate(500)

        window.setTimeout(function () {
          console.log("waiting")
        },1000)
      }
    })
    
    //Add function, pushes to local array which is pushed to local storage
    todoList.addTodo = function() {
      if(todoList.todoText === ""){
        alert("Write something first!")
      }
      else{
        todoList.todos.push({text:todoList.todoText, done:false});
        pushToStorage(todoList.todos)
        todoList.todoText = '';
      }
    };
    
    //Remaining calculation
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
    
    //archive function, keeps items that haven't been checked, pushes final array to local storage
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
      pushToStorage(todoList.todos)
    };
  });

