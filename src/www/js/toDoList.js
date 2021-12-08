class ToDoList{

    renderToDoList() {
        return`
         <ul id="to-do-list"> 
                <li>
                    <label for="checker">CHECKBOX TEST</label>
                    <input type="checkbox" name="checker">
                </li>
                <li>
                    <label for="checker">CHECKBOX TEST</label>
                    <input type="checkbox" name="checker">
                </li>
                <li>
                    <input type="text" id="to-do-list-input" placeholder="Add to do item...">
                    <button id="add-button-to-do">Add</button>
                </li>
                
            </ul>
        `;
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
