class ToDoList{
    
    async renderTodoList() {
        let todos = [];
        let result = await fetch('/rest/todo-list');
        todos = await result.json();
        
        let todoList = document.querySelector('#todoUl');
        todoList.innerHTML = "<style> #todoId{ background-color: rgb(129, 155, 129);  } </style>" ; 

        for(let todo of todos) {
            console.log(todo)
            let todoLi = `
            <li>
                text: ${todo.text}
            </li>
            `;
            todoList.innerHTML += todoLi ;
        }
        todoList.innerHTML += "<input type='text' id='todoInput' placeholder='Enter todo...'> <span id='todoAddButton'>Add</span>";
        

        let addBtn = document.getElementById("todoAddButton");
        addBtn.addEventListener("click", this.addTodoItem);

    }

    



    async addTodoItem() {
        if (document.getElementById("todoInput").value == '') {
            alert("Must enter something");
            console.log("Failed adding todo item, no value has been input")

        }
        else {
            console.log("Adding todo item")

            let item = {
                text: document.getElementById("todoInput").value
            };
            let result = await fetch("/rest/todo-list", {
                method: "POST",
                body: JSON.stringify(item)
            });
            document.getElementById("todoInput").value = '';
            
        }
        
    } 

    async deleteToDoItem() {

    }
       

}
