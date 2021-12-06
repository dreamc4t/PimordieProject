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
                        <img id="contact-logo" src="Pictures/phoneLogo.png" alt="">
                        <h5 id="contact-text">Jacks nummer</h5>
                    </div>
                    <div id="contact-email">
                        <img id="contact-logo" src="Pictures/emailLogo.png" alt="">
                        <h5 id="contact-text">Dennis Email</h5>
                    </div>
                    <div id="contact-address">
                        <img id="contact-logo" src="Pictures/mapLogo.png" alt="">
                        <h5 id="contact-text">Eriks adress</h5>
                    </div>
                </div>
                <div id="contact-map">
                    <map name=""></map>
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