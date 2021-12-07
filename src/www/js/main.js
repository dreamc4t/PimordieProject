let nav = new Nav();



document.querySelector('main').innerHTML = nav.renderMainNav();

onhashchange = changePage;
changePage();

function changePage() {
    let page = location.hash.replace('#', ''); 
    console.log(page);

    switch(page) {
        case('notes'):
        document.querySelector('main').innerHTML = "<h2> RENDER IN NOTES HERE </h2>";
        break;

        case('todo'):
        document.querySelector('main').innerHTML = "<h2> RENDERIN TO-DO LIST HERE </h2>";
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


