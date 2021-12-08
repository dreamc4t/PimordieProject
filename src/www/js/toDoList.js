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



       let todoInput = document.getElementById("todoInput").value;
        let addBtn = document.getElementById("todoAddButton");
        addBtn.addEventListener("click", tester)
 
        function tester() {
            console.log(todoInput + "hOAIJSALDKj")
        }
        /*
       this.addTodo("Hej du adasdasd test to do");


     
       */

       



    }



    async addTodo(textInput) {
        console.log("Adding new todo list item!");

        let rawResponse = await fetch('/rest/todo-list', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(textInput)
        });
        
    }


    

}
