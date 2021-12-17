class Login{

    renderLogin(){
        
        return`
        <div id="signup-mainbox">
            <nav id="signup-leftbox">
                <img id="signup-img" src="img/lock.jpg" alt="">
            </nav>
            <article id="signup-rightbox">
                <h1 id="signup-title">LOGIN</h1>
                <h2 id="signup-email">Email Address</h2>
                <input id="email-input" type="text">
                <h2 id="signup-password">Password</h2>
                <input id="password-input" type="password" value="Hicka">
                <div id="show-password">
                    <input id="checkbox" type="checkbox" onclick="signup.showPassword()">
                    <h2 id="password-text">Show password</h2>
                </div>
                <button onclick="login.loginAccount()" id="signup-button">LOGIN</button>
                <a id="login-create-toggle" href="#signup">Create account</a>
                <h2 id="wrong-input">Wrong email or password</h2>
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
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(user)
        });
        let response = await result.json();
        
        if(response.login === true){
            location.hash = "#notes";
            document.querySelector('.toggle-nav').innerHTML = nav.renderMainNav();
        }
        else{
            console.log("ska byta farg på wrong-input")
        }

    }

     
    

    showPassword() {
        let x = document.getElementById("password-input");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
}