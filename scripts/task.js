if (sessionStorage.data == undefined) {
    alert("Inicie sesion para ingresar a sus tareas")
    location.href= "./index.html";

}
window.addEventListener("load", () => {
  const userNamePlace = document.querySelector(".userName");
  const userImage = document.querySelector(".user-image");
  const closeButton = document.getElementById("closeApp");
  const urlRaiz = "https://ctd-todo-api.herokuapp.com/v1";
  const createTaskForm = document.querySelector("form");
  const taskDataInput = document.getElementById("nuevaTarea");
  const jwt = sessionStorage.getItem("data");
  const taskSpace = document.querySelector(".tareas-pendientes");
  const doTaskSpace = document.querySelector(".tareas-terminadas");
  let doButtons;
  let userData;
  let tasks;

  createTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (taskDataInput.value.length >= 1) {
      newTasks();
    } else {
      console.log("esto parece que funciona chico");
    }
  });
  closeButton.addEventListener("click", (e) => {
    closeSession();
  });

  const getUserData = () => {
    const getUserName = () => {
      let settings = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          authorization: jwt,
        },
      };
      fetch(urlRaiz + "/users/getMe", settings)
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log("f en la consola");
        })
        .then((data) => {
          // {id: 1792, firstName: "Daniel", lastName: "Garcia", email: "pruebatodo3@gmail.com"}
          userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          };
         
          showUserInfo();
        });
    };
    getUserName();
  };
  const showUserInfo = () => {
    userNamePlace.innerHTML = `${userData.firstName}` + " " + `${userData.lastName}`;
  };

  const getTasks = () => {
    let settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: jwt,
      },
    };
    fetch(urlRaiz + "/tasks", settings)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       
        tasks = data;
      
        renderTask();
      });
  };
  const newTasks = () => {
    const ntaskData = {
      description: `${taskDataInput.value}`,
      completed: false,
    };
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: jwt,
      },
      body: JSON.stringify(ntaskData),
    };

    fetch(urlRaiz + "/tasks", settings)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        taskDataInput.value = "";
        taskSpace.innerHTML = "";
        getTasks();
      });
  };

  const renderTask = () => {
    tasks.forEach((task) => {
      if (task.completed === false) {
        taskSpace.innerHTML += `
  <li class="tarea">
  <div class="not-done dobButton" id="${task.id}"></div>
  <div class="description">
    <p class="nombre">${task.description}</p>
    <p class="timestamp">Creada: ${task.createdAt}</p>
  </div>
</li>`;
      } else if (task.completed === true) {
        doTaskSpace.innerHTML += `
        <li class="tarea">
        <div class="done dobButton"></div>
        <div class="description">
          <p class="nombre">${task.description}</p>
          <p class="timestamp">Creada: ${task.createdAt}</p>
        </div>
      </li>`;
      }
    });
    doButtons = document.querySelectorAll(".dobButton");
    addDoEvent();
  };
  const doTask = (id) => {
    const ntaskData = {
      completed: true,
    };
    let settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        id: id,
        authorization: jwt,
      },
      body: JSON.stringify(ntaskData),
    };

    fetch(urlRaiz + "/tasks/" + id, settings)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        taskSpace.innerHTML = "";
        doTaskSpace.innerHTML = "";
        getTasks();
      });
  };
  const addDoEvent = () => {
    doButtons.forEach((e) => {
      e.addEventListener("click", () => {
        doTask(e.id);
      });
    });
  };
  getUserData();
  getTasks();
  const closeSession = () => {
    sessionStorage.clear();
    location.href = "./index.html";
  };
});
