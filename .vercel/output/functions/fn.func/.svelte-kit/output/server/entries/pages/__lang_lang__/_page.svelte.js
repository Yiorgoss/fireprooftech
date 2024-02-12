import { c as create_ssr_component, v as validate_component, e as each, d as escape } from "../../../chunks/ssr.js";
import { x as home_page_why_pick_us_one_subheading, y as home_page_why_pick_us_one_description, z as home_page_why_pick_us_two_subheading, A as home_page_why_pick_us_two_description, C as home_page_why_pick_us_three_subheading, D as home_page_why_pick_us_three_description, E as home_page_process_one_title, G as home_page_process_one_description, H as home_page_process_two_title, I as home_page_process_two_description, J as home_page_process_three_title, K as home_page_process_three_description, B as Button, L as home_page_landing_heading, M as home_page_landing_subheading, N as home_page_carousel_heading, O as home_page_carousel_description, P as home_page_process_heading, Q as home_page_process_subheading, R as read_about_us, T as home_page_why_pick_us_title } from "../../../chunks/messages.js";
import { C as Carousel, a as Carousel_content, b as Carousel_item, c as Carousel_next, d as Carousel_previous, e as CldImage } from "../../../chunks/carousel-next.js";
const Circular_carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { images = [] } = $$props;
  let api;
  let current = 0;
  if ($$props.images === void 0 && $$bindings.images && images !== void 0)
    $$bindings.images(images);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (api) {
        api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        api.on("select", () => {
          current = api.selectedScrollSnap() + 1;
          console.log(current);
        });
      }
    }
    $$rendered = `<div class="mx-20">${validate_component(Carousel, "Carousel.Root").$$render(
      $$result,
      {
        opts: { loop: true },
        class: "mx-auto w-full ",
        orientation: "horizontal",
        api
      },
      {
        api: ($$value) => {
          api = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, { class: " bg-blue-400" }, {}, {
            default: () => {
              return `${each(images, (image) => {
                return `${validate_component(Carousel_item, "Carousel.Item").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(image)} `;
                  }
                })}`;
              })}`;
            }
          })} ${validate_component(Carousel_next, "Carousel.Next").$$render($$result, {}, {}, {})} ${validate_component(Carousel_previous, "Carousel.Previous").$$render($$result, {}, {}, {})}`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Circle_image_section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { image = "" } = $$props;
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { isInset = false } = $$props;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.isInset === void 0 && $$bindings.isInset && isInset !== void 0)
    $$bindings.isInset(isInset);
  return `<div class="${["container", isInset ? "md:ml-32" : ""].join(" ").trim()}"><div class="flex flex-col md:flex-row items-center gap-6">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      class: "rounded-full border-8 border-border",
      src: image,
      height: 200,
      width: 200,
      alt: "test"
    },
    {},
    {}
  )} <div class="hidden h-2 w-2 rounded-full bg-border md:static"></div> <div class="relative h-10"> <div class="static md:absolute"><h4 class="relative flex h-10 items-start md:items-center text-xl"> ${escape(title)} <div class="absolute -left-[150%] bottom-0 top-0 -z-10 w-[200vw] bg-blue-300" data-svelte-h="svelte-mr8x68"></div></h4> <p class="">${escape(description)}</p></div></div></div></div>`;
});
const Why_pick_us_carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const reasons = [
    {
      src: "icons/clock.svg",
      title: home_page_why_pick_us_one_subheading(),
      description: home_page_why_pick_us_one_description()
    },
    {
      src: "icons/checkmark.svg",
      title: home_page_why_pick_us_two_subheading(),
      description: home_page_why_pick_us_two_description()
    },
    {
      src: "icons/leaves.svg",
      title: home_page_why_pick_us_three_subheading(),
      description: home_page_why_pick_us_three_description()
    }
  ];
  return `${validate_component(Carousel, "Carousel.Root").$$render($$result, { class: "w-full max-w-xs" }, {}, {
    default: () => {
      return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${each(reasons, (reason, i) => {
            return `${validate_component(Carousel_item, "Carousel.Item").$$render($$result, {}, {}, {
              default: () => {
                return `<div class="p-1"><span class="text-4xl font-semibold">${escape(i + 1)}</span></div> `;
              }
            })}`;
          })}`;
        }
      })} ${validate_component(Carousel_previous, "Carousel.Previous").$$render($$result, {}, {}, {})} ${validate_component(Carousel_next, "Carousel.Next").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const images = ["1", "2", "3", "4"];
  return `<div class=""> <div class="relative h-dvh">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      class: "h-screen w-full bg-blue-300 object-fill",
      src: "cld-sample-5",
      height: 800,
      width: 2e3,
      alt: "test"
    },
    {},
    {}
  )} <div class="absolute inset-10 flex flex-wrap items-center px-20 py-20 md:items-end"><div class=""><h1 class="text-center">${escape(home_page_landing_heading())}</h1> <p class="">${escape(home_page_landing_subheading())}</p></div></div></div> <div class="flex flex-col-reverse bg-blue-200 py-10 md:flex-row"><div class="basis-1/2">${validate_component(Circular_carousel, "CircularCarousel").$$render($$result, { images }, {}, {})}</div> <div class="basis-1/2 px-4 py-10"><h2 class="text-center py-5 text-2xl md:text-4xl">${escape(home_page_carousel_heading())}</h2> <p class="">${escape(home_page_carousel_description())}</p></div></div> <section class="overflow-hidden"><h2 class="text-2xl text-center md:text-4xl">${escape(home_page_process_heading())}</h2> <h3 class="text-lg">${escape(home_page_process_subheading())}</h3> <div class="flex flex-col gap-10">${validate_component(Circle_image_section, "CircleImageSection").$$render(
    $$result,
    {
      image: "cld-sample-5",
      title: home_page_process_one_title(),
      description: home_page_process_one_description()
    },
    {},
    {}
  )} <div class="">${validate_component(Circle_image_section, "CircleImageSection").$$render(
    $$result,
    {
      image: "cld-sample-5",
      title: home_page_process_two_title(),
      description: home_page_process_two_description(),
      isInset: true
    },
    {},
    {}
  )}</div> ${validate_component(Circle_image_section, "CircleImageSection").$$render(
    $$result,
    {
      image: "cld-sample-5",
      title: home_page_process_three_title(),
      description: home_page_process_three_description()
    },
    {},
    {}
  )}</div> <div class="flex items-center justify-center pt-20">${validate_component(Button, "Button").$$render($$result, { variant: "destructive" }, {}, {
    default: () => {
      return `${escape(read_about_us())}`;
    }
  })}</div></section> <div class="flex flex-col justify-center "><h3 class="py-10 text-center">${escape(home_page_why_pick_us_title())}</h3> <div class="mx-auto ">${validate_component(Why_pick_us_carousel, "WhyPickUsCarousel").$$render($$result, {}, {}, {})}</div></div></div>`;
});
export {
  Page as default
};
