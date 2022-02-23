//SELECT THE  CAMPOS
let mail = document.querySelector('#inputEmail');
let pass = document.querySelector('#inputPassword');

// DISABLE EL SUBMIT
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    let validMail = isValidMail();
    let validPass = isValidPass();

    if (validMail && validPass) {
        location.href = "mis-tareas.html";
    } else {
        // registar el error
        console.log("Ingreso inválido");
        registerLoginAttempt(mail.value, pass.value);
    }
});
//VALIDATION MAIL
function isValidMail() {
    let regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
    return regex.test(mail.value);
}
//VALIDATION PASS
function isValidPass() {
    return pass.value.length >= 8 && pass.value.length <= 12 &&
        pass.value.includes('.');
}
//SELECT  BOTTON
let button = document.querySelector('button');

//ENABLE BOTTON ??
mail.addEventListener('keyup', function() {
    console.log('keyup');
    enableButton();
});
//ENABLE BOTTON??
pass.addEventListener('keyup', function() {
    enableButton();
});
//HABILITADOR DEL BOTTON
function enableButton() {
    if (mail.value.length >= 6 && pass.value.length >= 6) {
        button.disabled = false;
        // button.removeAttribute('disabled');  
    }
}
//OBJETO CON LOS DATOS MALOS
let loginAttempts = [];
//CApTURADOR DE DATOS MALOS
function registerLoginAttempt(user, pass) {
    let attempt = {
        userLogin: user,
        password: pass
    };

    loginAttempts.push(attempt);
}
//LOG DE LOS DATOS MALOS
function showLoginAttempts() {
    console.log(loginAttempts);
}
//JSON DE LOS DATOS MALOS
function showLoginAttemptsInJson() {
    console.log(JSON.stringify(loginAttempts));
}