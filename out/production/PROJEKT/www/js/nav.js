class Nav{
    menu = [
        {href:"#notes", name: 'Notes', idName: 'notesId'},
        {href:"#todo", name: 'Todo', idName: 'todoId'}
    ];

    renderMainNav() {
        let items = '';

        for (let item of this.menu) {

       items += `<a href="${item.href}" id="${item.idName}">${item.name}</a>`;
       
        }
        
        return `
        <nav>
            ${items}
        </nav>
        `;
    }

    render() {
        return `
        <div> 
            ${ this.renderMainNav()}
        </div>
        `;
    }

}


