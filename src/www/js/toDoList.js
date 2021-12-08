class ToDoList{
    
    

    async renderTodoList() {
        let todos = [];
        let result = await fetch('/rest/todo-list');
        todos = await result.json();
        
        let todoList = document.querySelector('#todoUl');
        todoList.innerHTML = ""; 
    
        for(let todo of todos) {
            console.log(todo)
            let todoLi = `
            <li>
                text: ${todo.text}
            </li>
            `;
            todoList.innerHTML += todoLi + "<style> #todoId{ background-color: rgb(129, 155, 129);  } </style>";
        }
    }
   

    async addTodo() {
        console.log("Adding new todo list item!");

        let data = {text: "TODO TODO text text test test test"};
        let rawResponse = await fetch('/rest/todo-list', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }

}
