let nav = new Nav();
let notes = new Notes();
let login = new Login();
document.querySelector('main').innerHTML = notes.render();

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
        case('notes'):
        document.querySelector('main').innerHTML = notes.render() + " <style> #notesId{ background-color: rgb(129, 155, 129);  } </style> ";
        break;

        
        case('todo'):
        document.querySelector('main').innerHTML = '<ul id="todoUl"> </ul>';
        toDoList1.renderTodoList();
        
        break;
        

        case('login'):

        document.querySelector('main').innerHTML = login.renderLogin();
        break;

        case('sign-up'):
        let signup = new SignUp();
        document.querySelector('main').innerHTML = signup.renderSignUp();

        case('about-us'):
        let aboutUs = new AboutUs();
        document.querySelector('main').innerHTML = aboutUs.renderAboutUs();
        break;

        case('contact'):
        let contact = new Contact();
        document.querySelector('main').innerHTML = contact.renderContact();
        break;

        default:
            document.querySelector('main').innerHTML = notes.render();
    }
}


    


