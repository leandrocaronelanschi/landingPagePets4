const SUPABASE_URL = "https://zwegvzomzinoncbnkitq.supabase.co";
const SUPABASE_KEY = "sb_publishable_2JH_WIjndXSIQAkIri7eMg_wP8CG022";

let allTestimonials = [];
let displayedTestimonial = [];
let currentIndexTestimonial = 4;
let testimonialsPerBatch = 4;
const buttonMoreTestimonials = document.getElementById(
  "more-testimonials-button"
);

async function getTestimonials() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/depoimentos?select=*`,
      {
        method: "GET",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const dataTestimonials = await response.json();
    return dataTestimonials;

    console.log(dataTestimonials);
  } catch (error) {
    console.error("Erro ao buscar depoimentos", error);
  }
}

//Pega o returno de getTestimonials, popula alltetimonials e coloca 4 depoimentos para ser exibido.

getTestimonials().then((dados) => {
  allTestimonials = dados;

  displayedTestimonial = allTestimonials.slice(0, 4);

  console.log(allTestimonials);
});

// async function testimonialsReturn() {
//   try {
//     const listTestimonials = await getTestimonials();

//     console.log(listTestimonials);
//   } catch (error) {
//     console.error("Erro ao listar depoimentos do retorno");
//   }
// }

// testimonialsReturn();

buttonMoreTestimonials.addEventListener("click", () => {});
