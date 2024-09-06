const inputUser = document.getElementById("username");
inputUser.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    login();
  }
});

const inputPass = document.getElementById("password");
inputPass.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    login();
  }
});

const containerAlert = document.getElementById("containerAlert");
containerAlert.addEventListener("click", closeAlert);

const btnAlert = document.getElementById("btnAlert");
btnAlert.addEventListener("click", closeAlert);

/*-----------------------------------------------------------------*/

function closeAlert() {
  containerAlert.style.display = "none";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Autenticação
  if (username === auth.user && password === auth.pass) {
    const objAuth = [
      {
        user: username,
        pass: password,
      },
    ];
    // Armazena as credenciais em um objeto no localStorage
    localStorage.setItem(nameLocalStorage, JSON.stringify(objAuth));

    // Redireciona para a página principal
    window.location.href = "/home";
  } else {
    containerAlert.style.display = "block";
  }
}

function checkAuthentication() {
  const arrAuthlocal = localStorage.getItem(nameLocalStorage);
  const authLocal = JSON.parse(arrAuthlocal);

  const verifyAuth = authLocal !== null || authLocal[0].user === auth.user || authLocal[0].pass === auth.pass;

  // Verifica se o usuário está autenticado
  if (verifyAuth) {
    // Se não estiver autenticado, redireciona para a página home
    window.location.href = "/home";
  }
}

// Verifica a autenticação ao carregar a página
checkAuthentication();
