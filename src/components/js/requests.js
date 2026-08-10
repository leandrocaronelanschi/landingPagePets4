const SUPABASE_URL = "https://zwegvzomzinoncbnkitq.supabase.co";
const SUPABASE_KEY = "sb_publishable_2JH_WIjndXSIQAkIri7eMg_wP8CG022";

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

    const dados = await response.json();

    console.log(dados);
  } catch (error) {
    console.error("Erro ao buscar depoimentos", error);
  }
}

getTestimonials();
