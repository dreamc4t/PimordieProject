class Nav {
    mainNav = [
        {href:"#notes", name:'Notes'},
        {href:"#todo", name:'To-do list'}
    ];

    renderMainNav() {
        let items = '';
        for(let item of this.mainNav){
            items += `<a href="${item.href}">${item.name}</a>`;
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
            ${ this.renderMainNav() }
        </div>
        `;
    }
    
}