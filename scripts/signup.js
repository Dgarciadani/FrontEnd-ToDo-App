window.addEventListener("load", () => {
  console.log("cargo");

  //SELECT CAMPOS
  const campoName = document.querySelector("#nombre");
  const campoLast = document.querySelector("#apellido");
  const campoEmail = document.querySelector("#email");
  const campoPass = document.querySelector("#pass");
  const campoConfirm = document.querySelector("#confirmPass");
  const subButton = document.querySelector("button");
  const errorInputs = document.querySelectorAll(".error-input");
  const url = "https://ctd-todo-api.herokuapp.com/v1/users";

  //PREVENT REDIRECT
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    if (enableButton()) {
      console.log(colectData());
      // llamo a la f que envia la info a la api
      sendData();
    }
  });
  //ACA VAN LAS CORROBORACIONES DEL FRONT
  /*
        CONTENIDO STRING
        CONTENIDO MAIL
        CONTENIDO DEL PASS
        IGUALACION DE PASS        */
  function stringConte(strCampo) {
    let regex1 = new RegExp(`^([^0-9]*)$`);
    let regex2 = new RegExp(`^(?!\s*$).+`);
    return regex1.test(strCampo.value) && regex2.test(strCampo.value);
  }
  function isValidEmail() {
    let regex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    return regex.test(campoEmail.value);
  }
  function lengthPass() {
    return campoPass.value.length >= 8 && campoPass.value.length <= 256;
  }
  function contePass() {
    let regex = new RegExp(
      `^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$`
    );
    console.log(regex.test(campoPass.value) + "MIRATE ESTE PERRO");
    return regex.test(campoPass.value);
  }
  function twinsPass() {
    let regex = new RegExp(`^(?!\s*$).+`);
    return campoPass.value === campoConfirm.value && regex.test(campoPass.value);
  }

  campoName.addEventListener("keyup", () => {
    enableButton();
    showError(campoName);
  });
  campoLast.addEventListener("keyup", () => {
    enableButton();
    showError(campoLast);
  });
  campoEmail.addEventListener("keyup", () => {
    enableButton();
    showError(campoEmail);
  });
  campoPass.addEventListener("keyup", () => {
    enableButton();
    showError(campoPass);
  });
  campoConfirm.addEventListener("keyup", () => {
    enableButton();
    showError(campoConfirm);
  });

  //habilitar el button
  function enableButton() {
    if (
      stringConte(campoName) &&
      stringConte(campoLast) &&
      contePass() &&
      isValidEmail() &&
      lengthPass() &&
      twinsPass()
    ) {
      subButton.disabled = false;
      subButton.classList.add("enable");
      console.log("Button acti");
      return true;
    } else {
      subButton.disabled = true;
      subButton.classList.remove("enable");
      console.log("Button disabled");
      return false;
    }
  }
  //SHOW DE LOS ERRORES ITER 2
  function showError(camp) {
    switch (camp.id) {
      case "nombre":
        console.log("campo name in");
        if (!stringConte(campoName)) {
          errorInputs[0].innerHTML = `<li>"El campo nombre no es valido"</li>`;
          document.querySelector("#nombre").classList.add("error");
          break;
        } else {
          errorInputs[0].innerHTML = " ";
          document.querySelector("#nombre").classList.remove("error");
          break;
        }
      case "apellido":
        console.log("campo last in");
        if (!stringConte(campoLast)) {
          errorInputs[1].innerHTML = `<li>"El campo apellido no es valido"</li>`;
          document.querySelector("#apellido").classList.add("error");
          break;
        } else {
          errorInputs[1].innerHTML = " ";
          document.querySelector("#apellido").classList.remove("error");
          break;
        }
      case "email":
        console.log("campo email in");
        if (!isValidEmail(campoEmail)) {
          errorInputs[2].innerHTML = `<li>"El campo email no tiene un formato valido"</li>`;
          document.querySelector("#email").classList.add("error");
          break;
        } else {
          errorInputs[2].innerHTML = " ";
          document.querySelector("#email").classList.remove("error");
          break;
        }
      case "pass":
        console.log("campo pass in");
        if (!contePass(campoPass)) {
          errorInputs[3].innerHTML = `<li>"La contraseña debe incluir  por lo menos una mayuscula, una miniscula, un número y un caracter especial (@,#,$,%,^,&,*), Minimo 8 caracteres "</li>`;
          document.querySelector("#pass").classList.add("error");
          break;
        } else {
          errorInputs[3].innerHTML = " ";
          document.querySelector("#pass").classList.remove("error");
          break;
        }
      case "confirmPass":
        console.log("campo confirmpass in");
        if (!twinsPass(campoConfirm)) {
          errorInputs[4].innerHTML = `<li>"Las contraseñas no son iguales"</li>`;
          document.querySelector("#confirmPass").classList.add("error");
          break;
        } else {
          errorInputs[4].innerHTML = " ";
          document.querySelector("#confirmPass").classList.remove("error");
          break;
        }
    }
  }
  // Prototipo de showerror ITER 1
  /* function showErrors() {

    let espacioErrores = document.querySelector(".error-list");
    espacioErrores.innerHTML = "";
    let compro = [
      stringConte(campoName),
      stringConte(campoLast),
      isValidEmail(),
      contePass(),
      lengthPass(),
      twinsPass(),
    ];
    let errors = [];
    for (let i = 0; i < compro.length; i++) {
      switch (i) {
        case 0:
          if (!compro[i]) {
            document.querySelector("#nombre").classList.add("error");
            break;
          } else {
            document.querySelector("#nombre").classList.remove("error");
            break;
          }
        case 1:
          if (!compro[i]) {
            let f = "el campo apellido no es valido";
            errors.push(f);
            document.querySelector("#apellido").classList.add("error");
            break;
          } else {
            document.querySelector("#apellido").classList.remove("error");
            break;
          }
        case 2:
          if (!compro[i]) {
            let f = "el campo email no es valido";
            errors.push(f);
            document.querySelector("#email").classList.add("error");
            break;
          } else {
            document.querySelector("#email").classList.remove("error");
            break;
          }
        case 3:
          if (!compro[i]) {
            let f =
              "la contraseña debe incluir  por lo menos una mayuscula, una miniscula, un número y un caracter especial (@,#,$,%,^,&,*) ";
            errors.push(f);
            document.querySelector("#pass").classList.add("pass");
            break;
          } else {
            document.querySelector("#pass").classList.remove("error");
            break;
          }
        case 4:
          if (!compro[i]) {
            let f = "la contraseña debe ser de por lo menos 8 caracteres de largo";
            errors.push(f);
            document.querySelector("#pass").classList.add("error");
            break;
          } else {
            document.querySelector("#pass").classList.remove("error");
            break;
          }

        case 5:
          if (!compro[i]) {
            let f = "las contraseñas no son iguales o estan vacias";
            errors.push(f);
            document.querySelector("#confirmPass").classList.add("error");
            break;
          } else {
            document.querySelector("#confirmPass").classList.remove("error");
            break;
          }
      }
    }
    console.log(compro);
    errors.forEach((err) => {
      espacioErrores.innerHTML += `<li> ${err}</li>`;
    });
  } */
  
  function colectData() {
    let data = {
      firstName: `${campoName.value}`,
      lastName: `${campoLast.value}`,
      email: `${campoEmail.value}`,
      password: `${campoPass.value}`,
    };
    return data;
  }
  function armarPost() {
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(colectData()),
    };
    console.log(settings);
    return settings;
  }
  function sendData() {
    fetch(url, armarPost())
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // ESTO ESTA MAL, NO DEBERIA ESTABLECERSE EL SESION STORAGE CON SOLO REGISTRAR EL USUARIO, DEBERIA PEDIRSE INICIER SESION PRIMERO
        // sessionStorage.setItem("data", data.jwt);
        console.log(data.jwt);
        if (data.jwt) {
          alert("El usuario de creo correctamente");
          location.href = "./index.html";
        } else if (data === "El usuario ya se encuentra registrado") {
          alert(data);
        } else {
          alert("Ocurrio un problema al crear el usuario");
        }
      });
  }
});
