let nav = new Nav();
let contact = new Contact();
let aboutUs = new AboutUs()

/*document.querySelector('nav').innerHTML = nav.render(); */
document.getElementById('toggle-nav').innerHTML = nav.render();


onhashchange = changePage;
changePage();

function changePage() {
    let page = location.hash.replace('#', '');
    console.log(page);

    switch(page) {
        case(''):
        document.querySelector('main').innerHTML = "<h2>starsidan, kanske bara ha val för notes eller to-do här? Eller bara direkt in i notesr</h2>";
        break;
        case('notes'):
        document.querySelector('main').innerHTML = "<h2> N O T E S </h2>";
        break;

        case('todo'):
        document.querySelector('main').innerHTML = "<h2> T O D O </h2>";
        break;

        case('sign-up'):
        document.querySelector('main').innerHTML = "<h2> SIGN UP</h2>";
        break;

        case('about-us'):
        document.querySelector('main').innerHTML = aboutUs.renderAboutUs();
        break;

        case('contact'):
        document.querySelector('main').innerHTML = contact.renderContact();
        break;

        default:
            
            document.querySelector('main').innerHTML = "asdasd";
    }
}




