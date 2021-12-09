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
                ${todo.text} "<span style='float:right;' id='trashcan-div'> <img src='img/trashcan.png' style='height:15px;' id='trashcan-image'> </span>"
            </li>
            `;
            todoList.innerHTML += todoLi ;
        }
        todoList.innerHTML += "<input type='text' id='todoInput' placeholder='Enter todo...'> <span id='todoAddButton'>Add</span>";
        
        let addBtn = document.getElementById("todoAddButton");
        addBtn.addEventListener("click", this.addTodoItem);

        let deleteBtn = document.getElementById("trashcan-div")
        deleteBtn.addEventListener("click", tester);

        function tester() {
            console.log("TESTER");
        }

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
        console.log("Deleting item!");
        alert("ASDASD");

    }
       

}
