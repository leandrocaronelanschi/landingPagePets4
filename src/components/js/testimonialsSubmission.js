const SUPABASE_URL = "https://zwegvzomzinoncbnkitq.supabase.co";
const SUPABASE_KEY = "sb_publishable_2JH_WIjndXSIQAkIri7eMg_wP8CG022";

const form = document.getElementById("submission-form-testimonials");

const btnSendForm = document.getElementById("testimonials-btn-send");

async function postTestimonials(dadosFormulario) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/depoimentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=minimal"
      },
      body: JSON.stringify(dadosFormulario)
    });

    if (!response.ok) {
      throw new Error(`Erro no envio: ${response.statusText}`);
    }

    form.reset();

    return true;
  } catch (error) {
    console.error("Erro ao enviar depoimento.", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const dados = Object.fromEntries(formData.entries());

  console.log("Dadoscapturados", dados);

  postTestimonials(dados);
});
