class Footer{




    renderFooter(){
        return`
        <div id="logo-box">
                <img id="footer-logo" src="/pictures/pimordie_logo.png" alt="">
            </div>
            <div id="nav-box">
                <div id="nav-box-top">
                    <div id="inner-box">
                        <a id="nav-logos" href="#sign-up"><img id="signup" src="/pictures/signup.png" alt=""></a>
                        <h5 id="nav-logos-signup">SIGN UP</h5>
                    </div>
                    <div id="inner-box">
                        <a id="nav-logos" href="#about-us"><img id="about" src="/pictures/aboutUS.png" alt=""></a>
                        <h5 id="nav-logos-about">ABOUT US</h5>
                    </div>
                    <div id="inner-box">
                        <a id="nav-logos" href="#contact"><img id="contact" src="/pictures/contact.png" alt=""></a>
                        <h5 id="nav-logos-contact">CONTACT</h5>
                    </div>
                </div>
                <div id="nav-box-bottom">
                    <h4 id="copy">PimOrDie ©</h4>
                </div>
            </div>
            <div id="social-box">
                    <a id="social" href="https://www.facebook.com/"> <strong id="">FACEBOOK</strong> </a>
                    <a id="social" href="https://twitter.com/"> <strong>TWITTER</strong></a>
                    <a id="social" href="https://www.youtube.com/"> <strong>YOUTUBE</strong> </a>
                    <a id="social" href="https://www.instagram.com/"> <strong>INSTAGRAM</strong> </a>
            </div>
            `;
    }
}
