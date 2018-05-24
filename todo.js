window.onload = function(){
	
	registerServiceWorker();
}

//If storage space doesn't exist
if(localStorage.getItem("todoitems")==null){
    let placeholder = []
    localStorage.setItem("todoitems", JSON.stringify(placeholder))
}
this.registerServiceWorker()
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

function registerServiceWorker(){
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful: ', registration)
		}, function (err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err)
		})
	}
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
        let choosable = []
        angular.forEach(todoList.todos, function(choose) {
          if(!choose.done){
            choosable.push(choose.text)
          }
        })
        if(choosable.length > 0){
          let index = random(choosable.length)
          navigator.vibrate(500)
          alert("Randomly selected task: "+choosable[index])
        }
      }
    })
    
    //Add function, pushes to local array which is pushed to local storage
    todoList.addTodo = function() {
      if(todoList.todoText == ""){
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

