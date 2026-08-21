const SUPABASE_URL = "https://zwegvzomzinoncbnkitq.supabase.co";
const SUPABASE_KEY = "sb_publishable_2JH_WIjndXSIQAkIri7eMg_wP8CG022";

let allTestimonials = [];
let actualTestimonials = [];
const batchDisplay = 4;
let initialIndex = 4;

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

    allTestimonials = dataTestimonials;

    actualTestimonials = allTestimonials.slice(0, 4);

    const phraseTestimonials = document.querySelector(
      "#card-testimonial-phrase"
    );

    const elementPhrase = phraseTestimonials.querySelector(
      '[data-testimonials="phrase"]'
    );

    actualTestimonials.forEach((testimonials) => {
      console.log(testimonials);

      elementPhrase.textContent = testimonials.phrase;
    });

    console.log(allTestimonials);
    console.log(actualTestimonials);

    return dataTestimonials;
  } catch (error) {
    console.error("Erro ao buscar depoimentos", error);
  }
}

getTestimonials();

//Pega o returno de getTestimonials, popula alltetimonials e coloca 4 depoimentos para ser exibido.

buttonMoreTestimonials.addEventListener("click", () => {
  const parte = allTestimonials.slice(
    initialIndex,
    initialIndex + batchDisplay
  );

  actualTestimonials.push(...parte);
  initialIndex += batchDisplay;

  console.log(actualTestimonials);

  // getTestimonials().then((dados) => {
  //   allTestimonials = dados;
  //   displayedTestimonial = allTestimonials.slice(0, 4);
  //   if (currentIndexTestimonial < allTestimonials.length) {
  //     const xxxx = allTestimonials.length;
  //     console.log(xxxx);
  //   }
  //   console.log(allTestimonials);
  // });
});

// testimonialsReturn();
