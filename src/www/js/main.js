let login = new Login();
let nav = new Nav();
let notes = new Notes();
let signup = new SignUp();
let contact = new Contact();

// document.querySelector('main').innerHTML = notes.render();
// notes.renderNotesList();

document.querySelector('main').innerHTML = login.renderLogin();
document.querySelector('.toggle-nav').innerHTML = nav.renderMainNav() ;
/*  +"<style>  #notes a{ background-color: linen; } </style>" */

onhashchange = changePage;
changePage();

function openMail() {
    var adminMail = document.createElement("a");
    adminMail.href = "mailto:info@pimordie.com";
    adminMail.click();
}

function changePage() {
    let page = location.hash.replace('#', '');
    console.log(page);
    
    switch(page) {

        case('login'):
        document.querySelector('main').innerHTML = login.renderLogin();
        break;

        case('signup'):
        document.querySelector('main').innerHTML = signup.renderSignUp();
        break;

        case('notes'):
        document.querySelector('main').innerHTML = notes.render();
        notes.renderNotesList();
        break;
        
        case('todo'):
        document.querySelector('main').innerHTML = '<div id="todoWrapper"> </div>';
        toDoList1.renderTodoList();
        break;

        case('about-us'):
        let aboutUs = new AboutUs();
        document.querySelector('main').innerHTML = aboutUs.renderAboutUs();
        break;

        case('contact'):
        document.querySelector('main').innerHTML = contact.renderContact();
        break;

        default:
        //     document.querySelector('main').innerHTML = notes.render();
        // notes.renderNotesList();
        document.querySelector('main').innerHTML = login.renderLogin();
    }
}


    


