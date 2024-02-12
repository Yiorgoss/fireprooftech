import { c as create_ssr_component, v as validate_component, d as escape } from "../../../../chunks/ssr.js";
import { B as Button, U as about_fpt, V as about_page_description_one, W as about_page_our_work_heading, X as about_page_our_work_description, Y as about_page_project_in_mind, Z as get_free_estimate, _ as about_page_our_process_title, $ as about_page_our_process_description, a0 as about_page_fireproof_testing_heading, a1 as about_page_fireproof_testing_subheading, a2 as about_page_fireproof_testing_description, a3 as about_page_variations_of_resistance_heading, a4 as about_page_variations_of_resistance_card_one_heading, a5 as about_page_variations_of_resistance_card_one_description } from "../../../../chunks/messages.js";
import { C as Carousel, a as Carousel_content, b as Carousel_item, e as CldImage, d as Carousel_previous, c as Carousel_next } from "../../../../chunks/carousel-next.js";
const Plain_carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Carousel, "Carousel.Root").$$render($$result, { class: "ove[[rflow-x-hidden" }, {}, {
    default: () => {
      return `${validate_component(Carousel_content, "Carousel.Content").$$render(
        $$result,
        {
          class: "items-center justify-around bg-background/10 py-10"
        },
        {},
        {
          default: () => {
            return `${validate_component(Carousel_item, "Carousel.Item").$$render($$result, { class: "basis-1/4 text-center" }, {}, {
              default: () => {
                return `${validate_component(CldImage, "CldImage").$$render(
                  $$result,
                  {
                    src: "cld-sample-5",
                    height: 300,
                    width: 300,
                    alt: "test"
                  },
                  {},
                  {}
                )}`;
              }
            })} ${validate_component(Carousel_item, "Carousel.Item").$$render($$result, { class: "basis-1/3 text-center" }, {}, {
              default: () => {
                return `${validate_component(CldImage, "CldImage").$$render(
                  $$result,
                  {
                    src: "cld-sample-5",
                    height: 300,
                    width: 300,
                    alt: "test"
                  },
                  {},
                  {}
                )}`;
              }
            })} ${validate_component(Carousel_item, "Carousel.Item").$$render($$result, { class: "basis-1/4 text-center" }, {}, {
              default: () => {
                return `${validate_component(CldImage, "CldImage").$$render(
                  $$result,
                  {
                    src: "cld-sample-5",
                    height: 300,
                    width: 300,
                    alt: "test"
                  },
                  {},
                  {}
                )}`;
              }
            })}`;
          }
        }
      )} ${validate_component(Carousel_previous, "Carousel.Previous").$$render(
        $$result,
        {
          arrowClass: "w-6 h-6",
          class: "-left-8 h-full rounded-none border-none "
        },
        {},
        {}
      )} ${validate_component(Carousel_next, "Carousel.Next").$$render(
        $$result,
        {
          arrowClass: "w-6 h-6",
          class: "-right-8 h-full rounded-none border-none "
        },
        {},
        {}
      )}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="relative w-full overflow-hidden bg-foreground"><h1 class="w-full bg-background-secondary py-16 text-center font-playfair text-6xl uppercase">${escape(about_fpt())}</h1> ${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      class: "mx-auto -mt-[8px] rounded-full border-8 border-border",
      src: "cld-sample-5",
      height: 300,
      width: 300,
      alt: "test"
    },
    {},
    {}
  )} <div class="px-0 py-10 md:px-10"><div class="-mt-16 bg-background-secondary py-10">${escape(about_page_description_one())}</div></div> <div class="overflow-hidden bg-background-secondary"><div class="mx-auto -mb-[15%] -mt-[15%] flex aspect-square w-fit min-w-[90%] items-center justify-center rounded-full bg-foreground text-background"><div class="flex aspect-square h-[70.7%] w-[70.7%] flex-col justify-around"><h2 class="text-center text-4xl md:text-5xl">${escape(about_page_our_work_heading())}</h2> <div class="">${escape(about_page_our_work_description())}</div> <div class="flex items-center justify-center gap-5"><div class="basis-1/4">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      class: "",
      src: "cld-sample-5",
      height: 300,
      width: 200,
      alt: "test"
    },
    {},
    {}
  )}</div> <div class="basis-1/2">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      class: "",
      src: "cld-sample-5",
      height: 400,
      width: 400,
      alt: "test"
    },
    {},
    {}
  )}</div> <div class="basis-1/4">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      class: "",
      src: "cld-sample-5",
      height: 300,
      width: 200,
      alt: "test"
    },
    {},
    {}
  )}</div></div></div></div></div> <div class="flex flex-col items-center justify-center gap-10 border-y-4 p-10"><h3 class="text-2xl text-background md:text-4xl">${escape(about_page_project_in_mind())}</h3> <div class="h-1 border-t-4 border-white"></div> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(get_free_estimate())}`;
    }
  })}</div> <div class="pt-5"><h2 class="bg-background-secondary py-20 text-center text-4xl md:text-5xl">${escape(about_page_our_process_title())}</h2> <div class="container flex min-h-[500px] w-full flex-col py-10 md:flex-row"><div class="flex basis-1/2 items-center justify-center">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: "cld-sample-5",
      height: 300,
      width: 300,
      alt: "test"
    },
    {},
    {}
  )}</div> <p class="basis-1/2 text-background">${escape(about_page_our_process_description())}</p></div></div> <h2 class="bg-background-secondary py-20 text-center text-4xl md:text-5xl">${escape(about_page_fireproof_testing_heading())}</h2> <h3 class="py-10 text-center text-2xl text-background md:text-4xl">${escape(about_page_fireproof_testing_subheading())}</h3> <div class="mx-auto w-fit max-w-[500px] border-8 p-10"><p class="py-10 text-background">${escape(about_page_fireproof_testing_description())}</p></div> <div class="mx-auto w-4/6 py-5">${validate_component(Plain_carousel, "PlainCarousel").$$render($$result, {}, {}, {})}</div> <div class="overflow-hidden bg-background-secondary px-10 py-10"><h2 class="py-10 text-4xl md:text-5xl">${escape(about_page_variations_of_resistance_heading())}</h2> <div class="flex flex-col items-center justify-center gap-5 break-all md:flex-row"><div class="flex w-full flex-col items-center justify-center gap-3 border-8 border-destructive bg-foreground p-5 text-background md:w-1/4">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      class: "rounded-full",
      src: "cld-sample-5",
      height: 200,
      width: 200,
      alt: "test"
    },
    {},
    {}
  )} <h3 class="">${escape(about_page_variations_of_resistance_card_one_heading())}</h3> <p class="">${escape(about_page_variations_of_resistance_card_one_description())}</p></div></div></div></div>`;
});
export {
  Page as default
};
