new Vue({
  el: '#app',
  data() {
    return {
      todoList: [
        {"id":0,"title":"test","done":false},
      ],
      new_todo: '',
      showComplete: false,
    };
  },
  mounted() {
    this.getTodos();
  },
  watch: {
    todoList: {
      handler: function(updatedList) {
        localStorage.setItem('todo_list', JSON.stringify(updatedList));
      },
      deep: true
    }
  },
  computed:{
    pending: function() {
      return this.todoList.filter(function(item) {
        return !item.done;
      })
    },
    completed: function() {
      return this.todoList.filter(function(item) {
        return item.done;
      }); 
    },

	//date
    today: function() {
      var weekday = ["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"];
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      if(dd<10) {
          dd = '0'+dd
      } 
      if(mm<10) {
          mm = '0'+mm
      } 
      today = {
        day: weekday[today.getDay()],
        date:  dd + '.' + mm + '.' + yyyy,
      }
      return(today);
    }
  },
  methods: {
    // get all todos when loading the page
    getTodos() {
      if (localStorage.getItem('todo_list')) {
        this.todoList = JSON.parse(localStorage.getItem('todo_list'));
      }
    },
    // add a new item
    addItem() {
	  console.log("Task added");
      // validation check
      if (this.new_todo) {
        this.todoList.unshift({
          id: this.todoList.length,
          title: this.new_todo,
          done: false,
		  
        });
      }
      // reset new_todo
      this.new_todo = '';
      // save the new item in localstorage
      return true;
    },
    deleteItem(item) {
	  console.log("Task deleted");
      this.todoList.splice(this.todoList.indexOf(item), 1);
    },
    toggleShowComplete() {
	  console.log("Show completed tasks");
      this.showComplete = !this.showComplete;
    },
    clearAll() {
	  console.log("Delete all tasks");
      this.todoList = [];
    }
  },
});