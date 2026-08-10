async function loadCardTestimonials() {
  try {
    const response = await fetch("/src/components/cardTestimonials.html");
    const responseText = await response.text();

    const parser = new DOMParser();

    const cardTestimonialsTemplate = parser.parseFromString(
      responseText,
      "text/html"
    );

    const cardTestimonialsTemplateElement =
      cardTestimonialsTemplate.getElementById("template-card-testimonials");

    const clonecardTestimonials =
      cardTestimonialsTemplateElement.cloneNode(true);

    const areaRenderCardTestimonials = document.getElementById(
      "area-render-card-testimonials"
    );

    areaRenderCardTestimonials.appendChild(clonecardTestimonials);

    console.log(responseText);
  } catch (error) {
    console.error("Erro ao carregar os cards de depoimentos!", error);
  }
}

loadCardTestimonials();
