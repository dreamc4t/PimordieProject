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
                        <h5 id="contact-text">
                        <a href="javascript:void(0);" onclick=openMail()>Info@PimOrDie.com</a>
                        </h5>
                    </div>
                    <div id="contact-address">
                        <img id="contact-logo" src="img/mapLogo.png" alt="">
                        <h5 id="contact-text">
                        <a href="https://www.google.com/maps/place/Propellergatan+1,+211+15+Malm%C3%B6/@55.6102707,12.9754889,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a4035d202817:0xe8292db6903ccd60!8m2!3d55.6102707!4d12.9776776">Propellergatan 1, 211 15, Malmö</a>
                        </h5>
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
                <button id="send-button" onclick="#">SEND MESSAGE</button>
            </div>
        </aside>
        `;
    }
}