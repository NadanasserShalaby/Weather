// sign
var signName = document.getElementById("Name");
var signEmail = document.getElementById("Email");
var signPassword = document.getElementById("Password");
// login
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
//  url
var path = location.pathname.split('/');
var pathUrl = '';
for (var i = 0; i < path.length - 1; i++) {
    pathUrl += '/' + path[i];
}
console.log(pathUrl);

// to say welcome in home page
var username = localStorage.getItem('userName')
if (username) {
    document.getElementById('userName').innerHTML = username
}
var signContainer = [];

if (localStorage.getItem("user") !== null) {
    signContainer = JSON.parse(localStorage.getItem("user"));
}

// sign up
function signUp() {

    // check empety
    if (isEmpty() == false) {

        document.getElementById("exist").innerHTML = '<span class="text-danger ">All inputs is required</span>';
        clearFormSign();
        return false;
    }
    // check Email
    if (isEmailExist() == false) {
        document.getElementById("exist").innerHTML = '<span class="text-danger ">Email Already Exists</span>';
        // clearFormSign() ;
        return false;
    }
    // add new user
    else {

        console.log(" check valid");
        
        var same_name_entered = false;
        // Perform validation checks
        demo(signName.value); // Validate the Website Name
        demo2(signEmail.value); // Validate the Website URL
        demo3(signPassword.value); // Validate the Website URL
        // Check if both fields are valid before proceeding
        if (signName.classList.contains("is-valid") && signEmail.classList.contains("is-valid") && signPassword.classList.contains("is-valid")) {
            console.log(" valid");
            
            var signUp = {
                name: signName.value,
                email: signEmail.value,
                password: signPassword.value
            }
            for (var iterate = 0; iterate < signContainer.length; iterate++) {
                if (signContainer[iterate].name == signUp.name) {
                    same_name_entered = true;
                }
            }
            if (same_name_entered == true) {
                alert("You Enter the same Name");
            }
            else {
                console.log(signContainer.push(signUp));
                console.log(signContainer.length);

                localStorage.setItem("user", JSON.stringify(signContainer));
                document.getElementById("exist").innerHTML = '<span class="text-success m-3">Success</span>';
                clearFormSign();
            }
        }
        else {
            alert("Site Name or Url is not valid, \n\tPlease follow the rules below: \n\t\tSite name must contain at least 4 characters.\n\t\tSite URL must be a valid one.");
        }

    }
}

// check empty sign
function isEmpty() {
    if (signName.value == "" || signEmail.value == "" || signPassword.value == "") {
        return false;
    }
    else {
        return true;
    }
}

// check exist mail 
function isEmailExist() {
    for (var i = 0; i < signContainer.length; i++) {
        if (signContainer[i].email == signEmail.value) {
            return false;
        }
    }
}

// clear
function clearFormSign() {
    signName.value = null;
    signEmail.value = null;
    signPassword.value = null;
}
function clearFormLogin() {
    loginEmail.value = null;
    loginPassword.value = null;
}

// check empty login
function isEmptyLogin() {
    if (loginEmail.value == "" || loginPassword.value == "") {
        return false;
    }
    else {
        return true;
    }
}

// login
function login() {
    if (isEmptyLogin() == false) {
        document.getElementById("correct").innerHTML = '<span class="text-danger">All inputs is required</span>';
        clearFormLogin();
        return false;
    }
    console.log("Go");
    console.log(signContainer.length);

    var logPass = loginPassword.value;
    var logEmail = loginEmail.value;
    if (signContainer.length == 0) {
        document.getElementById("correct").innerHTML = `<span class="text-danger">Dont Have an account ,please Sign up</span>`;

    }
    for (var i = 0; i < signContainer.length; i++) {
        console.log("Entered");
        if (signContainer[i].email == logEmail && signContainer[i].password == logPass) {
            console.log("Entered if");

            localStorage.setItem("userName", signContainer[i].name);
            window.location.href = 'login.html';
        }
        else {
            console.log("incrroct");

            document.getElementById("correct").innerHTML = `<span class="text-danger">Incorrect Email or Password</span>`;
        }
    }
}

function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('userName')
}

// validation
// name
var pNameRegex = /^[a-zA-Z]{4,8}/;
function demo(pvalue) {
    if (pNameRegex.test(pvalue)) {
        signName.classList.add("is-valid");
        signName.classList.remove("is-invalid");
    }
    else {
        signName.classList.add("is-invalid");
        signName.classList.remove("is-valid");
    }
}
// email
var pNameRegex_2 = /.+[@].+[.].+/;
function demo2(pvalue) {
    if (pNameRegex_2.test(pvalue)) {
        signEmail.classList.add("is-valid");
        signEmail.classList.remove("is-invalid");
    }
    else {
        signEmail.classList.add("is-invalid");
        signEmail.classList.remove("is-valid");
    }
}
// password
var pNameRegex_3 = /[A-Za-z\d@$!%*?&]{8,}/;
function demo3(pvalue) {
    if (pNameRegex_3.test(pvalue)) {
        signPassword.classList.add("is-valid");
        signPassword.classList.remove("is-invalid");
    }
    else {
        signPassword.classList.add("is-invalid");
        signPassword.classList.remove("is-valid");
    }
}