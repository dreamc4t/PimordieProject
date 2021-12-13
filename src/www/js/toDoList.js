class ToDoList{
    
    async renderTodoList() {
        let todos = [];
        let result = await fetch('/rest/todo-list');
        todos = await result.json();
        
        let todoList = document.querySelector('#todoUl');
        todoList.innerHTML = "<style> #todoId{ background-color: rgb(129, 155, 129);  } </style>" ; 

        console.log("rendering todo list..")
        
        for(let todo of todos) {
            let todoLi = `
            <li> 
                ${todo.text} ID=${todo.todo_id} Completed?=${todo.completed}
                <span class='trashcan-div'id='trash${todo.todo_id}' style='float:right;'> <img src='img/trashcan.png' style='height:15px;' class='trashcan-image'> </span>
                `;
    
                if (todo.completed == true) {
                    todoLi += "<input type='checkbox' class='isItCompleted-div'id='done" + todo.todo_id +"' checked> </li>"
                }
                else {
                    todoLi += "<input type='checkbox' class='isItCompleted-div'id='done"+ todo.todo_id +"'> </li>"

            }
            todoList.innerHTML += todoLi;
            
      }

        todoList.innerHTML += "<input type='text' id='todoInput' placeholder='Enter todo...'> <span id='todoAddButton'>Add</span>";
        
        let addBtn = document.getElementById("todoAddButton");
        addBtn.addEventListener("click", addTodoItem);

        document.querySelectorAll(".trashcan-div").forEach(item => {
            item.addEventListener("click", deleteItemByClick)
        }); 

        document.querySelectorAll(".isItCompleted-div").forEach(item => {
            item.addEventListener("click", setIsCompelted)
        }); 

    }
}

let toDoList1 = new ToDoList();


    async function deleteItemByClick() {

        idTodelete = this.id.replace('trash', '')
        let yesOrNo = confirm("Are you sure?");
    
        if (yesOrNo == true) {
            let todo = {
                todo_id: idTodelete
            }
        
            let result = await fetch('/rest/todo-list/' + idTodelete, {
                method: 'delete',
                body: JSON.stringify(todo)
            });
            console.log("Deleting id with id number " + idTodelete)
        }

        else {
            console.log("ok inget jävla deletande då")
        }
        toDoList1.renderTodoList();
        
    }

    async function addTodoItem() {
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
        toDoList1.renderTodoList();

    } 

    async function setIsCompelted() {

        idToComplete = this.id.replace('done','');
        console.log(this.id)
        console.log(idToComplete + " is completed!")


        let todo = {
            todo_id: idToComplete
        }
    
        let result = await fetch('/rest/todo-list/' + idToComplete, {
            method: 'put',
            body: JSON.stringify(todo)
        });
        console.log("Set todo item with id number " + idToComplete +" to compelted. WP")
        toDoList1.renderTodoList();
    }


