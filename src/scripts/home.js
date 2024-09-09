const baseUrl = `http://${localIP}:${localPortProPresenter}`;
const timeLazy = 200;

document.getElementById("btn-previous").addEventListener("click", previousSlide);
document.getElementById("btn-previous-portrait").addEventListener("click", previousSlide);
document.getElementById("btn-next").addEventListener("click", nextSlide);
document.getElementById("btn-refresh").addEventListener("click", () => {
  window.location.reload();
});
document.getElementById("btn-logout").addEventListener("click", logout);

const boxImage = document.getElementById("box-img");
const imgSlideCurrent = document.getElementById("img-slideCurrent");
const textAlert = document.getElementById("text-alert");

function showAlertEndSlide(show, positionSlide) {
  if (show && positionSlide === "fim") {
    textAlert.innerHTML = "Fim dos Slides";
    textAlert.style.opacity = 1;
  } else if (show && positionSlide === "inicio") {
    textAlert.innerHTML = "Início dos Slides";
    textAlert.style.opacity = 1;
  } else {
    textAlert.innerHTML = "";
    textAlert.style.opacity = 0;
  }
}

async function nextSlide() {
  // Obtém o status da apresentação
  const statusSlideResponse = await axios.get(`${baseUrl}/v1/status/layers`);
  const statusSlide = statusSlideResponse.data.slide;

  try {
    await axios.get(`${baseUrl}/v1/presentation/active/next/trigger`);
    // Atualiza a imagem
    refreshSlide();

    if (imgSlideCurrent.getAttribute("src") === "/src/icons/notSlide.jpg") {
      showAlertEndSlide(false);
    }
    showAlertEndSlide(false);
  } catch (error) {
    console.warn("Error in previousSlide:", error);
    if (statusSlide === true) {
      showAlertEndSlide(true, "fim");
      // Oculta menssagem depois de um tempo
      setTimeout(() => {
        textAlert.style.opacity = 0;
      }, 4000);
    } else {
      showAlertEndSlide(false);
      // Oculta menssagem depois de um tempo
      setTimeout(() => {
        textAlert.style.opacity = 0;
      }, 4000);
    }
  }
}
async function previousSlide() {
  // Obtém o status da apresentação
  const statusSlideResponse = await axios.get(`${baseUrl}/v1/status/layers`);
  const statusSlide = statusSlideResponse.data.slide;

  try {
    await axios.get(`${baseUrl}/v1/presentation/active/previous/trigger`);
    // Atualiza a imagem
    refreshSlide();

    if (imgSlideCurrent.getAttribute("src") === "/src/icons/notSlide.jpg") {
      showAlertEndSlide(false);
    }
    showAlertEndSlide(false);
  } catch (error) {
    console.warn("Error in previousSlide:", error);
    if (statusSlide === true) {
      showAlertEndSlide(true, "inicio");
      // Oculta menssagem depois de um tempo
      setTimeout(() => {
        textAlert.style.opacity = 0;
      }, 4000);
    } else {
      showAlertEndSlide(false);
      // Oculta menssagem depois de um tempo
      setTimeout(() => {
        textAlert.style.opacity = 0;
      }, 4000);
    }
  }
}

function createElementImage(boxImage, objImageUrl) {
  // Remove a última imagem, se houver
  if (boxImage.lastElementChild) {
    document.getElementById("img-slideCurrent").style.opacity = 0;
    boxImage.removeChild(boxImage.lastElementChild);
  }

  // Cria um novo elemento de imagem e configura os atributos necessários
  const newImage = document.createElement("img");
  newImage.setAttribute("src", objImageUrl.url);
  newImage.style.opacity = 0;
  newImage.id = "img-slideCurrent";

  // Adiciona a nova imagem ao contêiner
  boxImage.appendChild(newImage);

  // Aplica efeito de transição na exibição da imagem
  setTimeout(() => {
    newImage.style.opacity = 1;
  }, 300);

  return newImage;
}

async function updateImage() {
  try {
    // Obtém o status da apresentação
    const statusSlideResponse = await axios.get(`${baseUrl}/v1/status/layers`);
    const statusSlide = statusSlideResponse.data.slide;

    // Obtém o ID da apresentação ativa
    const currentSlideResponse = await axios.get(`${baseUrl}/v1/presentation/active`);
    const currentSlide = currentSlideResponse.data?.presentation?.id?.uuid;

    // Obtém o índice do slide atual
    const indexSlideResponse = await axios.get(`${baseUrl}/v1/presentation/slide_index`);
    const indexSlide = indexSlideResponse.data?.presentation_index?.index;

    // URL da imagem
    const objImageUrl = { url: `${baseUrl}/v1/presentation/${currentSlide}/thumbnail/${indexSlide}?quality=960&thumbnail_type=jpeg` };

    // Cria uma nova imagem
    const newImage = createElementImage(boxImage, objImageUrl);

    // Se não tiver slide na projeção, atribui uma imagem de slide não existente
    if (statusSlide === false) {
      objImageUrl.url = "/src/icons/notSlide.jpg";
      createElementImage(boxImage, objImageUrl);

      return;
    }

    // Obtem a quantidade de slides da apresentação
    const totalCurrentSlideResponse = await axios.get(`${baseUrl}/v1/presentation/${currentSlide}`);
    const totalCurrentSlide = totalCurrentSlideResponse.data?.presentation?.groups[0].slides.length;

    // Mostra o índice do slide
    const numberIndexSlide = Number(indexSlide) + 1;
    const srcNewImage = newImage.getAttribute("src");
    const textIndexSlide =
      srcNewImage === "/src/icons/notSlide.jpg" || srcNewImage === "/src/icons/warningConection.jpg"
        ? ""
        : `Slide ${numberIndexSlide} de ${totalCurrentSlide}`;
    document.getElementById("textIndexSlide").innerText = textIndexSlide;
  } catch (error) {
    // URL da imagem
    const objImageUrl = { url: "/src/icons/warningConection.jpg" };

    createElementImage(boxImage, objImageUrl);

    console.warn("Error in updateImage:", error);
  }
}

function refreshSlide() {
  setTimeout(async () => {
    await updateImage();
  }, timeLazy);
}

function checkAuthentication() {
  const objAuthlocal = localStorage.getItem(nameLocalStorage);
  const authLocal = JSON.parse(objAuthlocal);

  if (authLocal === null) {
    // Se não estiver autenticado, redireciona para a página de login
    window.location.href = "/";
    return;
  }

  const verifyAuth = authLocal[0].user === auth.user && authLocal[0].pass === auth.pass;

  // Verifica se o usuário está autenticado
  if (verifyAuth === false) {
    // Se não estiver autenticado, redireciona para a página de login
    window.location.href = "/";
  } else {
    // Se estiver autenticado, Atualiza a visualização do preview de slides
    refreshSlide();
  }
}

// Função de logout
function logout() {
  localStorage.setItem(nameLocalStorage, null);
  window.location.href = "/";
}

// Verifica a autenticação ao carregar a página
checkAuthentication();
