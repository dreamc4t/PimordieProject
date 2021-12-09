class ToDoList{
    
    async renderTodoList() {
        let todos = [];
        let listWeSee = [];
        listWeSee = document.getElementsByClassName('listWeSee');
        /*
        console.log(listWeSee);
        */
        let result = await fetch('/rest/todo-list');
        todos = await result.json();
        
        let todoList = document.querySelector('#todoUl');
        todoList.innerHTML = "<style> #todoId{ background-color: rgb(129, 155, 129);  } </style>" ; 

        console.log("rendering todo list..")
        
        let i = 0;
        for(let todo of todos) {
            let todoLi = `
            <li class="listWeSee"> 
                ${todo.text} ID=${todo.todo_id} <span class='trashcan-div'id='tc${i}' style='float:right;'> <img src='img/trashcan.png' style='height:15px;' class='trashcan-image'> </span>
            </li>
            `;
            todoList.innerHTML += todoLi;

            console.log(todo.todo_id)
            listWeSee[i].value = todo.todo_id;
            
            i++

        }
        /*
        for (let i = 0; i <listWeSee.length; i++) {
            console.log(listWeSee[i].value);
        }
        */
        todoList.innerHTML += "<input type='text' id='todoInput' placeholder='Enter todo...'> <span id='todoAddButton'>Add</span>";
        
        let addBtn = document.getElementById("todoAddButton");
        addBtn.addEventListener("click", this.addTodoItem);



        /* Här är tcX's id samma som listWeSee[X]value */
        let testButton = [];
       
        for (let i = 0; i<listWeSee.length; i++) {
            testButton[i] = document.getElementById("tc" + i);
            testButton[i].addEventListener("click", function(){
                console.log("Test test ")
                console.log(listWeSee[i].value)


            });
        }
    
        
        



    }

    

   
      async deleteTodoItem() {
        console.log("Här var det delete function!")
        /*
        let id = {
            todo_id: 42
        };
        let result = await fetch("/rest/todo-list", {
            method: "DELETE",
            body: JSON.stringify(item)
        });
        */
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

}
