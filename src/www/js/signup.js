class SignUp {
  renderSignUp() {
    return `
        <div id="signup-mainbox">
            <nav id="signup-leftbox">
                <img id="signup-img" src="img/dynamic_line_light_blue_background_558053.jpg" alt="">
            </nav>
            <article id="signup-rightbox">
                <h1 id="signup-title">SIGN UP</h1>
                <h2 id="signup-email">Email Address</h2>
                <input id="email-input" type="text">
                <h2 id="signup-password">Password</h2>
                <input id="password-input" type="password" value="Hicka">
                <div id="show-password">
                    <input id="checkbox" type="checkbox" onclick="signup.showPassword()">
                    <h2 id="password-text">Show password</h2>
                </div>
                <button onclick="signup.createAccount()" id="signup-button">SIGN UP</button>
                <a id="login-create-toggle" href="#login">Back to login</a>
            </article>
        </div>`;
  }

  async createAccount() {
    let createEmail = document.querySelector("#email-input").value;
    let createPassword = document.querySelector("#password-input").value;
    console.log(createEmail, createPassword);
    let user = {
      email: createEmail,
      password: createPassword,
    };
    let result = await fetch("/rest/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    let response = await result.json();

    if(response.login === true){
      console.log("account created byta farg")
    }
    else{
      console.log("account already exists byt farg")
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
