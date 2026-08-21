const SUPABASE_URL = "https://zwegvzomzinoncbnkitq.supabase.co";
const SUPABASE_KEY = "sb_publishable_2JH_WIjndXSIQAkIri7eMg_wP8CG022";

let allTestimonials = [];
let currentIndex = 0;
const BATCH_SIZE = 4;
let cardTemplateNode = null;

const areaRenderTestimonials = document.getElementById(
  "area-render-card-testimonials"
);

const btnMore = document.getElementById("more-testimonials-button");

//Carrega o template HTML do componente uma única vez

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

//Renderiza uma lista de depoimentos na tela

function renderTestimonials(testimonials, container) {
  if (!cardTemplateNode || !container) return;

  const fragment = document.createDocumentFragment();
}
