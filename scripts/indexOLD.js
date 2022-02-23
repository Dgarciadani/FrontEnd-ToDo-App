
window.addEventListener("load",()=>{ console.log("loaded") //check de carga
//SELECTOR DE Obj y Var
let campoEmail = document.querySelector("#inputEmail");
let campoPass = document.querySelector("#inputPassword");
let button = document.querySelector("button");

//PREVENT Y EJECUTOR
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let emailValidado = emailValid();
  let passwordValidado = passwordValid();
  if (emailValidado && passwordValidado) {
    location.href = "./mis-tareas";
    //aca tiene que ir la corroboracion con la API
  }
});
//VALIDATORS
function emailValid() {
  let regExp = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  return regExp.test(campoEmail.value);
}
function passwordValid() {
  return (
    campoPass.value.length >= 8 &&
    campoPass.value.length < 256 &&
    campoPass.value.includes(".")
  );
}
//ENABLE BUTTON / OR NOT
campoEmail.addEventListener("keyup", () => enableButton());
campoPass.addEventListener("keyup", () => enableButton());

function enableButton() {
  if (emailValid() && campoPass.value.length >= 8) {
    button.disabled = false;
    //button.removeAttribute("disabled");
    button.classList.add("enable");
  } else {
    button.disabled = true;
    button.classList.remove("enable");
  }
}
//OBJETO MALO
let loginAttempts = [];
// CAPTURADOR DEL LOGIN INCORRECTO
function loginAttempts(user, pass) {
    let attempt = {
        email: user,
        password: pass
    }
    loginAttempts.push(attempt);
}

function consoleLoginAttempts() {
    console.log(loginAttempts);
}

})
//fase 2
