let nav = new Nav();
let contact = new Contact();
let aboutUs = new AboutUs();


onhashchange = changePage;
changePage();

function changePage() {
    let page = location.hash.replace('#', ''); 
    console.log(page);

    switch(page) {
        case('notes'):
        document.querySelector('main').innerHTML = notes.renderNotesPage();
        break;

        case('todo'):
        document.querySelector('main').innerHTML = "<h2> RENDER IN TO-DO LIST HERE </h2>";
        break;

        case('sign-up'):
        document.querySelector('main').innerHTML = "<h2> SIGN UP HERE </h2>";
        break;

        case('about-us'):
        document.querySelector('main').innerHTML = aboutUs.renderAboutUs();
        break;

        case('contact'):
        document.querySelector('main').innerHTML = contact.renderContact();
        break;

        default:
            document.querySelector('main').innerHTML = renderNotesPage();
    }
}


