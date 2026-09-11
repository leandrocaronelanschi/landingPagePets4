const btnMenuNav = document.querySelector(".btn-hamburger-header");
const mediaQuery = window.matchMedia("(max-width: 768px)");

async function loadMenuNav() {
  try {
    const response = await fetch("/src/components/templates/menuNav.html");
    const htmlText = await response.text();
    const menuNav = document.getElementById("area-menu-nav");
    menuNav.innerHTML = htmlText;
    console.log(htmlText);
  } catch (error) {
    console.error("Erro ao carregar o Menu de navegação", error);
  }
}

function handleScreenChange(e) {
  if (e.matches) {
    btnMenuNav.style.display = "inline-block";
  } else {
    btnMenuNav.style.display = "none";
  }
}

// Executa na inicialização e escuta mudanças na tela

mediaQuery.addEventListener("change", handleScreenChange);
handleScreenChange(mediaQuery);

btnMenuNav.addEventListener("click", async () => {
  let fieldMenu = document.querySelector(".container-menu-nav");
  if (!fieldMenu) {
    await loadMenuNav();
    fieldMenu = document.querySelector(".container-menu-nav");
  } else {
    if (fieldMenu.style.display === "none") {
      fieldMenu.style.display = "flex";
    } else {
      fieldMenu.style.display = "none";
    }
  }
});
