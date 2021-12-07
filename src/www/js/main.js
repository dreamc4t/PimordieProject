let nav = new Nav();

document.querySelector('.toggle-nav').innerHTML = nav.renderMainNav() ;

/*  +"<style>  #notes a{ background-color: linen; } </style>" */

onhashchange = changePage;
changePage();

function changePage() {
    let page = location.hash.replace('#', ''); 
    console.log(page);

    switch(page) {
        case('notes'):
        document.querySelector('main').innerHTML = "<h2> RENDER IN NOTES HERE </h2>" + " <style> #notesId{ background-color: rgb(129, 155, 129);  } </style> ";
        break;

        case('todo'):
        let toDoList = new ToDoList();
        document.querySelector('main').innerHTML = toDoList.renderToDoList() + " <style> #todoId{ background-color: rgb(129, 155, 129);  } </style> ";
        break;

        case('sign-up'):
        let signUp = new SignUp();
        document.querySelector('main').innerHTML = signUp.renderSignUp();
        break;

        case('about-us'):
        let aboutUs = new AboutUs();
        document.querySelector('main').innerHTML = aboutUs.renderAboutUs();
        break;

        case('contact'):
        let contact = new Contact();
        document.querySelector('main').innerHTML = contact.renderContact();
        break;

        default: 
        document.querySelector('main').innerHTML = result.join('');
    }
}

function activePage() {

}


