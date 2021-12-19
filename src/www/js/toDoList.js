class ToDoList{
    
    async getTodoListFromDb(sortingBy, ascendDecend) {
        let todos = [];
        let result = await fetch('/rest/todo-list');
        todos = await result.json();

        
        function getSortOrder(prop) {    
            return function(a, b) {    
                if (a[prop] > b[prop]) {    
                    return 1;    
                } else if (a[prop] < b[prop]) {    
                    return -1;    
                }    
                return 0;    
            }    
        } 
        todos.sort(getSortOrder(sortingBy));
        if (ascendDecend == "ascend") {
            todos.reverse();
        }
        
        
        return todos;
    }
    
    async renderTodoList(sortingBy, ascendDecend) {
        let wrapper = document.querySelector('#todoWrapper');
        wrapper.innerHTML = '<ul id="todoUl"> </ul>'
        let todoList = document.querySelector('#todoUl');

        console.log("rendering todo list..")
        
        for(let todo of await this.getTodoListFromDb(sortingBy, ascendDecend)) {
            let todoLi = `
            <li> 
                ${todo.text}
                <span class='trashcan-div'id='trash${todo.todo_id}' style='float:right;'> <img src='img/trashcan.png' style='height:15px;' class='trashcan-image'> </span> <span style='float:right;' class='edit-div'id='edit${todo.todo_id}'> <img src='img/edit.png' style='height:15px;'> </span>
                `;
    
                if (todo.completed == true) {
                    todoLi += "<input type='checkbox' class='isItCompleted-div'id='done" + todo.todo_id +"' checked> </li>"
                }
                else {
                    todoLi += "<input type='checkbox' class='isItCompleted-div'id='done"+ todo.todo_id +"'> </li>"

            }
            todoList.innerHTML += todoLi;
            todoList.innerHTML += "<style> #todoId{ background-color: rgb(129, 155, 129);  } </style>" ; 

            
      }

        wrapper.innerHTML += "<div class='todoBottom'> <input type='text' id='todoInput' maxlength='68' placeholder='Enter stuff to do...'> <span id='todoAddButton'>Add</span>  <button id='sortCompletedButton'> Sort by completed</button> <button id='sortAlphabetButton'> Sort by name</button> <button id='sortLastAddedButton'> Sort by latest</button> </div>";
        
        let addBtn = document.getElementById("todoAddButton");
        addBtn.addEventListener("click", addTodoItem);

        let sortButtonCompleted = document.getElementById("sortCompletedButton");
        sortButtonCompleted.addEventListener("click", sortCompleted)

        let sortButtonAlphabet = document.getElementById("sortAlphabetButton");
        sortButtonAlphabet.addEventListener("click", sortAlphabetically)

        let sortLastAddedButton = document.getElementById("sortLastAddedButton");
        sortLastAddedButton.addEventListener("click", sortLastAdded)

        document.querySelectorAll(".trashcan-div").forEach(item => {
            item.addEventListener("click", deleteItemByClick)
        }); 

        document.querySelectorAll(".isItCompleted-div").forEach(item => {
            item.addEventListener("click", setIsCompelted)
        }); 

        document.querySelectorAll(".edit-div").forEach(item => {
            item.addEventListener("click", editByClick)
        })

       

    }
}

let toDoList1 = new ToDoList();
       

        let complCounter = 1;
        async function sortCompleted() {
            if (complCounter  == 1 ) {
                toDoList1.renderTodoList("completed");
                complCounter++;
            }
            else if (complCounter == 2){
                toDoList1.renderTodoList("completed", "ascend");
                complCounter++;
            }
            else {
                toDoList1.renderTodoList();
                complCounter++;
            }

            if (complCounter >3) {
                complCounter = 1;
            }
        }

        let alphabetCounter = 1;
        async function sortAlphabetically() {
            if (alphabetCounter  == 1 ) {
                toDoList1.renderTodoList("text");
                alphabetCounter++;
            }
            else if (alphabetCounter == 2){
                toDoList1.renderTodoList("text", "ascend");
                alphabetCounter++;
            }
            else {
                toDoList1.renderTodoList();
                alphabetCounter++;
            }

            if (alphabetCounter >3) {
                alphabetCounter = 1;
            }
        }

        let lastAddedCounter = 1;
        async function sortLastAdded() {
            console.log("HEJ!")
            if (lastAddedCounter  == 1 ) {
                toDoList1.renderTodoList("todo_id");
                lastAddedCounter++;
            }
            else if (lastAddedCounter == 2){
                toDoList1.renderTodoList("todo_id", "ascend");
                lastAddedCounter++;
            }

            if (lastAddedCounter >2) {
                lastAddedCounter = 1;
            }
        }

        

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

    async function editByClick() {
        console.log("edkjha a a b b b bakjhit")
        idToEdit = this.id.replace('edit', '');
        let textInput = prompt("Update to:");
        console.log(textInput + " " + idToEdit)

        let textUpdate = {
            text: textInput,
            todo_id: idToEdit
        }
        

        await fetch('/rest/todo-list/edit/' + idToEdit, {
            method: 'put',
            body: JSON.stringify(textUpdate)
        }); 
        console.log("Hejdå")
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


  

 