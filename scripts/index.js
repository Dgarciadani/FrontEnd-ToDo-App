window.addEventListener("load", () => {
  //SELECT CAMPOS
  let campoMail = document.querySelector("#inputEmail");
  let campoPass = document.querySelector("#inputPassword");
  let subButton = document.querySelector("button");
  campoMail.addEventListener("keyup", () => enableButton());
  campoPass.addEventListener("keyup", () => enableButton());
  let url = "https://ctd-todo-api.herokuapp.com/v1/users/login";

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    if (enableButton()) {
      sendData();
      // F que envia la info a la api
      // redirect al dash con las tareas
    }
  });

  function isEmailValid() {
    let regex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    return regex.test(campoMail.value);
  }

  function isPasswordValid() {
    return campoPass.value.length >= 8 && campoPass.value.length <= 256;
  }

  function enableButton() {
    if (isEmailValid() && isPasswordValid()) {
      console.log("habilitado");
      subButton.disabled = false;
      subButton.classList.add("enable");
      return true
    } else {
      subButton.disabled = true;
      subButton.classList.remove("enable");
      return false
    }
  }
  function colectData() {
    let data = {
      email: `${campoMail.value}`,
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
    return settings;
  }
  function sendData() {
    fetch(url, armarPost())
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem("data", data.jwt);
        if (data.jwt) {
          alert("El se logeo creo correctamente");
          location.href = "./mis-tareas.html";
        } else {
          alert("Ocurrio un problema al iniciar sesion");
        }
      });
  }
});
