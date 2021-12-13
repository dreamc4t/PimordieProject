class Login{

    renderLogin(){
        
        return`
        <div id="signup-mainbox">
            <nav id="signup-leftbox">
                <img id="signup-img" src="img/register.jpg" alt="">
            </nav>
            <article id="signup-rightbox">
                <h1 id="signup-title">LOGIN</h1>
                <h2 id="signup-email">Email Address</h2>
                <input id="email-input" type="text">
                <h2 id="signup-password">Password</h2>
                <input id="password-input" type="text">
                <div id="show-password">
                    <input id="checkbox" type="checkbox">
                    <h2 id="password-text">Show password</h2>
                </div>
                <button onclick="login.loginAccount()" id="signup-button">Login</button>
                <a id="login-create-toggle" href="#signup">Create account</a>
            </article>
        </div>
        `
    }

    async loginAccount(){

        let loginEmail = document.querySelector("#email-input").value;
        let loginPassword = document.querySelector("#password-input").value;
      
        let user = {
            email: loginEmail,
            password: loginPassword
        }

        let result = await fetch("/rest/user", {
        method: "POST",
        body: JSON.stringify(user)
        });
    }
}