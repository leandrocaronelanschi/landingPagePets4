const SUPABASE_URL = "https://zwegvzomzinoncbnkitq.supabase.co";
const SUPABASE_KEY = "sb_publishable_2JH_WIjndXSIQAkIri7eMg_wP8CG022";

let allTestimonials = [];
let currentIndex = 0;
const BATCH_SIZE = 3;
let cardTemplateNode = null;

const areaRenderTestimonials = document.getElementById(
  "area-render-card-testimonials"
);

const btnMore = document.getElementById("more-testimonials-button");

//Carrega o template HTML do componente uma única vez

async function loadTemplate() {
  const response = await fetch("src/components/cardTestimonials.html");
  if (!response.ok) {
    throw new Error(`Erro ao buscar o template HTML: ${response.status}`);
  }

  const htmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");
  cardTemplateNode = doc.getElementById("template-card-testimonials");
}

//Renderiza uma lista de depoimentos na tela

function renderTestimonials(testimonialsList, container) {
  if (!cardTemplateNode || !container) return;

  const fragment = document.createDocumentFragment();
  testimonialsList.forEach((item) => {
    const card = cardTemplateNode.cloneNode(true);

    card.removeAttribute("id"); // Evita IDs duplicados no DOM

    // Mapeamento dos elementos usando os data-fields

    const pharseEl = card.querySelector('[data-field="phrase"]');
    const nameTutorPetEl = card.querySelector('[data-field="name-tutor-pet"]');
    const cityUfEl = card.querySelector('[data-field="tutor-city-uf"]');
    const tutorImg = card.querySelector('[data-field="tutor-photo"]');
    const petImg = card.querySelector('[data-field="pet-photo"]');

    // Preenchimento com fallbacks de segurança

    if (pharseEl) {
      pharseEl.textContent = item.phrase || "";
    }

    if (nameTutorPetEl) {
      nameTutorPetEl.textContent = `${item.name_tutor || ""} e ${item.name_pet || ""} ${item.emoji_pet}`;
    }

    if (cityUfEl) {
      cityUfEl.textContent = `${item.city_tutor || ""} - ${item.uf_tutor || ""}`;
    }

    if (tutorImg) {
      tutorImg.src = item.tutor_photo;
    }

    if (petImg) {
      petImg.src = item.pet_photo;
    }

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

//Controla a exibição do próximo lote de cards

function displayNextBatch(container, buttonMore) {
  const nextBatch = allTestimonials.slice(
    currentIndex,
    currentIndex + BATCH_SIZE
  );
  renderTestimonials(nextBatch, container);
  currentIndex += BATCH_SIZE;

  // Esconde o botão caso todos os depoimentos já tenham sido exibidos
  if (currentIndex >= allTestimonials.length && buttonMore) {
    buttonMore.style.display = "none";
  }
}

//Inicializa o componente quando o DOM estiver pronto

async function initTestimonials() {
  // Elementos do DOM capturados como const com garantia de existência
  const areaRenderTestimonials = document.getElementById(
    "area-render-card-testimonials"
  );
  const btnMore = document.getElementById("more-testimonials-button");

  if (btnMore) {
    btnMore.addEventListener("click", () => {
      displayNextBatch(areaRenderTestimonials, btnMore);
    });
  }

  try {
    const [_, response] = await Promise.all([
      loadTemplate(),
      fetch(`${SUPABASE_URL}/rest/v1/depoimentos?select=*`, {
        method: "GET",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      })
    ]);

    if (!response.ok) {
      throw new Error(`Erro na API Supabase: ${response.status}`);
    }

    allTestimonials = await response.json();

    // Renderiza os primeiros 4 cards
    displayNextBatch(areaRenderTestimonials, btnMore);
  } catch (error) {
    console.error("Erro ao carregar os depoimentos:", error);
  }
}

// Garante que o script execute com o DOM totalmente montado
document.addEventListener("DOMContentLoaded", initTestimonials);
