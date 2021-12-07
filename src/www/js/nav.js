class Nav{
    menu = [
        {href:"#notes", name: 'Notes'},
        {href:"#todo", name: 'Todo'}
    ];

    renderMainNav() {
        let items = '';
        for (let item of this.menu) {
            items += `<a href="${item.href}">${item.name}</a>`;
        }
        return `
        <nav id="toggle-nav">
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


