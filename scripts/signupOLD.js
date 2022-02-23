window.addEventListener("load", () => {
  console.log("loaded");
  //FASE 1 SOLO COMPRO Y CAPTURA DE DATOS
  //SELECTOR DE CAMPOS
  let nombre = document.querySelector("#nombre");
  let apellido = document.querySelector("#apellido");
  let email = document.querySelector("#email");
  let pass = document.querySelector("#pass");
  let confirmpass = document.querySelector("#confirmPass");
  let espacioError = document.querySelector(".form-header");

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let nombreValidado = stringValidator(nombre) && lengthValidator(nombre);
    let apellidoValidado = stringValidator(apellido) && lengthValidator(apellido);
    let emailValidado = lengthValidator(email) && emailValidator();
    let passValidado = passwordValid(pass);
    let confirmPassValidado = passwordValid(confirmpass);
    let passCoheValidado = passcoherence();

    let todoOk =
      nombreValidado &&
      apellidoValidado &&
      emailValidado &&
      passValidado &&
      confirmPassValidado &&
      passCoheValidado;
    if (todoOk) {
      console.log("esta todo ok en fase 1");
      enivarPost();
    }
  });

  //VALIDADORES ESTATICOS
  function stringValidator(stringCampo) {
    let regExp = new RegExp(/^[a-zA-Z ]+$/);
    return regExp.test(stringCampo.value);
  }

  function lengthValidator(campo) {
    return campo.value.length > 2;
  }

  function emailValidator() {
    let regExp = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    return regExp.test(email.value);
  }

  function passwordValid(passw) {
    return (
      passw.value.length >= 8 && passw.value.length < 256 && passw.value.includes(".")
    );
  }

  function passcoherence() {
    return pass.value === confirmpass.value;
  }

//VALIDADORES DINAMICOS
nombre.addEventListener("keyup", (e) => {
  let mensajeError= ""
  console.log(e.key);
  if (stringValidator(nombre)&&lengthValidator(nombre)) {
    console.log("todo correcto por aqui: "+nombre.value);
    
   }
   else{

  }
});

  // FASE 2 USO DE LA API
  function dataRegister() {
    let dataConfirmada = {
      firstName: nombre.value,
      lastName: apellido.value,
      email: email.value,
      password: pass.value,
    };
    console.log(dataConfirmada);
    return dataConfirmada;
  }
  let url = "https://ctd-todo-api.herokuapp.com/v1/users";

  function armarPost() {
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(dataRegister()),
    };
    console.log(settings);
    return settings;
  }

  function enivarPost() {
    fetch(url, armarPost())
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem("data", data.jwt);
        console.log(data.jwt);
        if (data.jwt) {
          alert("el usuario se creo satisfactoriamente");
          location.href = "./index.html";
        } else {
          alert("ocurrio un problema inesperado, vuelva a intentar");
        }
      }
      );
      
  }
});
