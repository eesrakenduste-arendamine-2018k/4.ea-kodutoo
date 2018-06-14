window.onload = function(){
  registerServiceWorker();
}

function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}


function add() {
    var task = document.getElementById('task').value;
 
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}
 

// Funktsiooni remove asemele tahaks panna funktsiooni, mis muudab
// List itemite klassi ja lisab nad klassi, mis paneb külge line through
// Et tehtud taskid oleks läbikriipsutatud. Katsetasime igatpidi, ei õnnestunud
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}
 
function show() {
    var todos = get_todos();
 
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}
 
document.getElementById('add').addEventListener('click', add);
show();




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