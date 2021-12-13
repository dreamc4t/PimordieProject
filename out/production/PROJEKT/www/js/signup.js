class SignUp{


    renderSignUp(){
        
        return`
        <div id="signup-mainbox">
            <nav id="signup-leftbox">
                <img id="signup-img" src="img/register.jpg" alt="">
            </nav>
            <article id="signup-rightbox">
                <h1 id="signup-title">SIGN UP</h1>
                <h2 id="signup-email">Email Address</h2>
                <input id="email-input" type="text">
                <h2 id="signup-password">Password</h2>
                <input id="password-input" type="text">
                <div id="show-password">
                    <input id="checkbox" type="checkbox">
                    <h2 id="password-text">Show password</h2>
                </div>
                <button onclick="signup.createAccount()" id="signup-button">SIGN UP</button>
                <a id="login-create-toggle" href="#login">Back to login</a>
            </article>
        </div>`
    }

    async createAccount(){

        let createEmail = document.querySelector("#email-input").value;
        let createPassword = document.querySelector("#password-input").value;
        let user = {
            email: createEmail,
            password: createPassword
        }

        let result = await fetch("/rest/users", {
        method: "POST",
        body: JSON.stringify(user)
        });
    }

}