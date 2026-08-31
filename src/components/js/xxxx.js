const SUPABASE_URL = "https://zwegvzomzinoncbnkitq.supabase.co";
const SUPABASE_KEY = "sb_publishable_2JH_WIjndXSIQAkIri7eMg_wP8CG022";

let allTestimonials = [];
let currentIndex = 0;
const BATCH_SIZE = 4;

let cardTemplateNode = null;
let areaRenderTestimonials = null;
let btnMore = null;

/**
 * 1. Carrega o template HTML do componente uma única vez
 */
async function loadTemplate() {
  const response = await fetch("/src/components/cardTestimonials.html");
  if (!response.ok) {
    throw new Error(`Erro ao buscar o template HTML: ${response.status}`);
  }

  const htmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");

  cardTemplateNode = doc.getElementById("template-card-testimonials");
}

/**
 * 2. Renderiza uma lista de depoimentos na tela
 */
function renderTestimonials(testimonialsList) {
  if (!cardTemplateNode || !areaRenderTestimonials) return;

  const fragment = document.createDocumentFragment();

  testimonialsList.forEach((item) => {
    // Clona o nó base com todos os seus filhos
    const card = cardTemplateNode.cloneNode(true);

    // Remove o ID do clone para evitar múltiplos IDs iguais no DOM
    card.removeAttribute("id");

    // Mapeamento dos elementos pelos data-fields
    const phraseEl = card.querySelector('[data-field="phrase"]');
    const nameTutorPetEl = card.querySelector('[data-field="name-tutor-pet"]');
    const cityUfEl = card.querySelector('[data-field="tutor-city-uf"]');
    const tutorImg = card.querySelector('[data-field="tutor-photo"]');
    const petImg = card.querySelector('[data-field="pet-photo"]');

    // Preenchimento seguro com fallbacks
    if (phraseEl) {
      phraseEl.textContent = `"${item.phrase || item.depoimento || ""}"`;
    }

    if (nameTutorPetEl) {
      nameTutorPetEl.textContent = item.name_tutor_pet || item.nome || "";
    }

    if (cityUfEl) {
      cityUfEl.textContent = item.tutor_city_uf || item.cidade || "";
    }

    if (tutorImg && item.tutor_photo) {
      tutorImg.src = item.tutor_photo;
    }

    if (petImg && item.pet_photo) {
      petImg.src = item.pet_photo;
    }

    fragment.appendChild(card);
  });

  areaRenderTestimonials.appendChild(fragment);
}

/**
 * 3. Controla a exibição do próximo lote de cards
 */
function displayNextBatch() {
  const nextBatch = allTestimonials.slice(
    currentIndex,
    currentIndex + BATCH_SIZE
  );
  renderTestimonials(nextBatch);
  currentIndex += BATCH_SIZE;

  // Se já exibiu todos os depoimentos cadastrados, esconde o botão
  if (currentIndex >= allTestimonials.length && btnMore) {
    btnMore.style.display = "none";
  }
}

/**
 * 4. Busca os dados no Supabase e inicia a primeira renderização
 */
async function initTestimonials() {
  // Captura os elementos do DOM garantindo que o HTML já foi carregado
  areaRenderTestimonials = document.getElementById(
    "area-render-card-testimonials"
  );
  btnMore = document.getElementById("more-testimonials-button");

  if (btnMore) {
    btnMore.addEventListener("click", displayNextBatch);
  }

  try {
    // Executa o carregamento do template e a requisição da API em paralelo
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
    displayNextBatch();
  } catch (error) {
    console.error("Erro ao carregar os depoimentos:", error);
  }
}

// Inicializa a execução após o carregamento da árvore DOM
document.addEventListener("DOMContentLoaded", initTestimonials);
