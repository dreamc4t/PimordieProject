class Contact{


    //Render in main when #contact
    renderContact(){
        return`
        <article id="contact-leftside">
            <div id="contact-header">
                <h1 id="contact-headline">
                    Get in touch
                </h1>   
                <h2 id="contact-subline">
                    Contact us for suggestions or questions.
                </h2>
            </div>
            <div id="contact-main">
                <div id="contact-contact">
                    <div id="contact-phone">
                        <img id="contact-logo" src="img/phoneLogo.png" alt="">
                        <h5 id="contact-text">+46 734 434 432</h5>
                    </div>
                    <div id="contact-email">
                        <img id="contact-logo" src="img/emailLogo.png" alt="">
                        <h5 id="contact-text">Info@PimOrDie.com</h5>
                    </div>
                    <div id="contact-address">
                        <img id="contact-logo" src="img/mapLogo.png" alt="">
                        <h5 id="contact-text">Propellergatan 1, 211 15, Malmö</h5>
                    </div>
                </div>
            </div>
        </article>
        <aside id="contact-rightside">
            <div id="contact-innerbox">
                <input id="input-contact" type="text" placeholder="FULL NAME">
            </div>
            <hr id="line">
            <div id="contact-innerbox">
                <input id="input-contact" type="text" placeholder="EMAIL">
            </div>
            <hr id="line">
            <div id="message-box">
                <input id="input-message" type="text" placeholder="MESSAGE">
            </div>
            <hr id="line">
            <div id="contact-innerbox">
                <button id="send-button" onclick="">SEND MESSAGE</button>
            </div>
        </aside>
        `;
    }
}