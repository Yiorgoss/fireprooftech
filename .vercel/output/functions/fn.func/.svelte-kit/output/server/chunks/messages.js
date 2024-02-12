import { o as onDestroy, g as get_store_value, c as create_ssr_component, h as compute_rest_props, i as spread, j as escape_attribute_value, k as escape_object, b as add_attribute, v as validate_component } from "./ssr.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { d as derived, r as readable } from "./index.js";
import { o as onMount } from "./ssr2.js";
import { tv } from "tailwind-variants";
import { l as languageTag } from "./runtime.js";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name2) {
  return void_element_names.test(name2) || name2.toLowerCase() === "!doctype";
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
const isBrowser = typeof document !== "undefined";
const isFunction = (v) => typeof v === "function";
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isElementDisabled(element) {
  const ariaDisabled = element.getAttribute("aria-disabled");
  const disabled = element.getAttribute("disabled");
  const dataDisabled = element.hasAttribute("data-disabled");
  if (ariaDisabled === "true" || disabled !== null || dataDisabled) {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isReadable(value) {
  return isObject(value) && "subscribe" in value;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
const FIRST_KEYS = [kbd.ARROW_DOWN, kbd.PAGE_UP, kbd.HOME];
const LAST_KEYS = [kbd.ARROW_UP, kbd.PAGE_DOWN, kbd.END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SELECTION_KEYS = [kbd.ENTER, kbd.SPACE];
const safeOnMount = (fn) => {
  try {
    onMount(fn);
  } catch {
    return fn();
  }
};
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn();
  }
};
function derivedWithUnsubscribe(stores, fn) {
  let unsubscribers = [];
  const onUnsubscribe = (cb) => {
    unsubscribers.push(cb);
  };
  const unsubscribe = () => {
    unsubscribers.forEach((fn2) => fn2());
    unsubscribers = [];
  };
  const derivedStore = derived(stores, ($storeValues) => {
    unsubscribe();
    return fn($storeValues, onUnsubscribe);
  });
  safeOnDestroy(unsubscribe);
  const subscribe = (...args) => {
    const unsub = derivedStore.subscribe(...args);
    return () => {
      unsub();
      unsubscribe();
    };
  };
  return {
    ...derivedStore,
    subscribe
  };
}
function effect(stores, fn) {
  const unsub = derivedWithUnsubscribe(stores, (stores2, onUnsubscribe) => {
    return {
      stores: stores2,
      onUnsubscribe
    };
  }).subscribe(({ stores: stores2, onUnsubscribe }) => {
    const returned = fn(stores2);
    if (returned) {
      onUnsubscribe(returned);
    }
  });
  safeOnDestroy(unsub);
  return unsub;
}
const documentClickStore = readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
const useClickOutside = (node, config = {}) => {
  let options = { enabled: true, ...config };
  function isEnabled() {
    return typeof options.enabled === "boolean" ? options.enabled : get_store_value(options.enabled);
  }
  const unsubscribe = documentClickStore.subscribe((e) => {
    if (!isEnabled() || !e || e.target === node) {
      return;
    }
    const composedPath = e.composedPath();
    if (composedPath.includes(node))
      return;
    if (options.ignore) {
      if (isFunction(options.ignore)) {
        if (options.ignore(e))
          return;
      } else if (Array.isArray(options.ignore)) {
        if (options.ignore.length > 0 && options.ignore.some((ignoreEl) => {
          return ignoreEl && (e.target === ignoreEl || composedPath.includes(ignoreEl));
        }))
          return;
      }
    }
    options.handler?.(e);
  });
  return {
    update(params) {
      options = { ...options, ...params };
    },
    destroy() {
      unsubscribe();
    }
  };
};
const documentEscapeKeyStore = readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
const useEscapeKeydown = (node, config = {}) => {
  let unsub = noop;
  function update(config2 = {}) {
    unsub();
    const options = { enabled: true, ...config2 };
    const enabled = isReadable(options.enabled) ? options.enabled : readable(options.enabled);
    unsub = executeCallbacks(
      // Handle escape keydowns
      documentEscapeKeyStore.subscribe((e) => {
        if (!e || !get_store_value(enabled))
          return;
        const target = e.target;
        if (!isHTMLElement(target) || target.closest("[data-escapee]") !== node) {
          return;
        }
        e.preventDefault();
        if (options.ignore) {
          if (isFunction(options.ignore)) {
            if (options.ignore(e))
              return;
          } else if (Array.isArray(options.ignore)) {
            if (options.ignore.length > 0 && options.ignore.some((ignoreEl) => {
              return ignoreEl && target === ignoreEl;
            }))
              return;
          }
        }
        options.handler?.(e);
      }),
      effect(enabled, ($enabled) => {
        if ($enabled) {
          node.dataset.escapee = "";
        } else {
          delete node.dataset.escapee;
        }
      })
    );
  }
  update(config);
  return {
    update,
    destroy() {
      node.removeAttribute("data-escapee");
      unsub();
    }
  };
};
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder[key];
      }
    });
  });
  return attrs;
}
const Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "type", "builders", "el"]);
  let { href = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { builders = [] } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-button-root": "" };
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0)
    $$bindings.builders(builders);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `${builders && builders.length ? ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        { tabindex: "0" },
        escape_object(getAttrs(builders)),
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}` : ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        { tabindex: "0" },
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}`}`;
});
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;
    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;
    return valueB;
  };
  const styleToString2 = (style2) => {
    return Object.keys(style2).reduce((str, key) => {
      if (style2[key] === void 0)
        return str;
      return str + `${key}:${style2[key]};`;
    }, "");
  };
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
      return styleToString2({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "builders"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  let { builders = [] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0)
    $$bindings.builders(builders);
  return `${validate_component(Button$1, "ButtonPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { builders },
      {
        class: cn(buttonVariants({ variant, size, className }))
      },
      { type: "button" },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const buttonVariants = tv({
  base: "inline-flex items-center justify-center text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      xl: "h-14 w-14 px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const home$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Home`;
const about_us$1 = /* @__NO_SIDE_EFFECTS__ */ () => `About Us`;
const contact_us$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Contact Us`;
const find_us$1 = /* @__NO_SIDE_EFFECTS__ */ () => `find_us`;
const name$1 = /* @__NO_SIDE_EFFECTS__ */ () => `name`;
const email$1 = /* @__NO_SIDE_EFFECTS__ */ () => `email`;
const message$1 = /* @__NO_SIDE_EFFECTS__ */ () => `message`;
const about_fpt$1 = /* @__NO_SIDE_EFFECTS__ */ () => `About FPT`;
const read_about_us$1 = /* @__NO_SIDE_EFFECTS__ */ () => `read_about_us`;
const get_free_estimate$1 = /* @__NO_SIDE_EFFECTS__ */ () => `get_free_estimate`;
const submit$1 = /* @__NO_SIDE_EFFECTS__ */ () => `submit`;
const home_page_landing_heading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_landing_heading`;
const home_page_landing_subheading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_landing_subheading`;
const home_page_carousel_heading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_carousel_heading`;
const home_page_carousel_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_carousel_description`;
const home_page_process_heading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_process_heading`;
const home_page_process_subheading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_process_subheading`;
const home_page_process_one_title$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_process_one_title`;
const home_page_process_one_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_process_one_description`;
const home_page_process_two_title$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_process_two_title`;
const home_page_process_two_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_process_two_description`;
const home_page_process_three_title$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_process_three_title`;
const home_page_process_three_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_process_three_description`;
const home_page_why_pick_us_title$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_why_pick_us_title`;
const home_page_why_pick_us_one_subheading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_why_pick_us_one_subheading`;
const home_page_why_pick_us_one_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_why_pick_us_one_description`;
const home_page_why_pick_us_two_subheading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_why_pick_us_two_subheading`;
const home_page_why_pick_us_two_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_why_pick_us_two_description`;
const home_page_why_pick_us_three_subheading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_why_pick_us_three_subheading`;
const home_page_why_pick_us_three_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `home_page_why_pick_us_three_description`;
const about_page_description_one$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_description_one`;
const about_page_our_work_heading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_our work_heading`;
const about_page_our_work_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_our_work_description`;
const about_page_project_in_mind$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_project_in_mind`;
const about_page_our_process_title$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_our_process_title`;
const about_page_our_process_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_our_process_description`;
const about_page_fireproof_testing_heading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_fireproof_testing_heading`;
const about_page_fireproof_testing_subheading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_fireproof_testing_subheading`;
const about_page_fireproof_testing_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_fireproof_testing_description`;
const about_page_variations_of_resistance_heading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_variations_of_resistance_heading`;
const about_page_variations_of_resistance_card_one_heading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_variations_of_resistance_card_one_heading`;
const about_page_variations_of_resistance_card_one_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `about_page_variations_of_resistance_card_one_description`;
const contact_page_heading$1 = /* @__NO_SIDE_EFFECTS__ */ () => `contact_page_heading`;
const contact_page_description$1 = /* @__NO_SIDE_EFFECTS__ */ () => `contact_page_description`;
const home = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home$1,
    il: home$1
  }[options.languageTag ?? languageTag()]();
};
const about_us = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_us$1,
    il: about_us$1
  }[options.languageTag ?? languageTag()]();
};
const contact_us = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: contact_us$1,
    il: contact_us$1
  }[options.languageTag ?? languageTag()]();
};
const find_us = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: find_us$1,
    il: find_us$1
  }[options.languageTag ?? languageTag()]();
};
const name = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: name$1,
    il: name$1
  }[options.languageTag ?? languageTag()]();
};
const email = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: email$1,
    il: email$1
  }[options.languageTag ?? languageTag()]();
};
const message = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: message$1,
    il: message$1
  }[options.languageTag ?? languageTag()]();
};
const about_fpt = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_fpt$1,
    il: about_fpt$1
  }[options.languageTag ?? languageTag()]();
};
const read_about_us = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: read_about_us$1,
    il: read_about_us$1
  }[options.languageTag ?? languageTag()]();
};
const get_free_estimate = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: get_free_estimate$1,
    il: get_free_estimate$1
  }[options.languageTag ?? languageTag()]();
};
const submit = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: submit$1,
    il: submit$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_landing_heading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_landing_heading$1,
    il: home_page_landing_heading$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_landing_subheading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_landing_subheading$1,
    il: home_page_landing_subheading$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_carousel_heading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_carousel_heading$1,
    il: home_page_carousel_heading$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_carousel_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_carousel_description$1,
    il: home_page_carousel_description$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_process_heading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_process_heading$1,
    il: home_page_process_heading$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_process_subheading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_process_subheading$1,
    il: home_page_process_subheading$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_process_one_title = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_process_one_title$1,
    il: home_page_process_one_title$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_process_one_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_process_one_description$1,
    il: home_page_process_one_description$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_process_two_title = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_process_two_title$1,
    il: home_page_process_two_title$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_process_two_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_process_two_description$1,
    il: home_page_process_two_description$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_process_three_title = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_process_three_title$1,
    il: home_page_process_three_title$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_process_three_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_process_three_description$1,
    il: home_page_process_three_description$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_why_pick_us_title = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_why_pick_us_title$1,
    il: home_page_why_pick_us_title$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_why_pick_us_one_subheading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_why_pick_us_one_subheading$1,
    il: home_page_why_pick_us_one_subheading$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_why_pick_us_one_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_why_pick_us_one_description$1,
    il: home_page_why_pick_us_one_description$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_why_pick_us_two_subheading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_why_pick_us_two_subheading$1,
    il: home_page_why_pick_us_two_subheading$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_why_pick_us_two_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_why_pick_us_two_description$1,
    il: home_page_why_pick_us_two_description$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_why_pick_us_three_subheading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_why_pick_us_three_subheading$1,
    il: home_page_why_pick_us_three_subheading$1
  }[options.languageTag ?? languageTag()]();
};
const home_page_why_pick_us_three_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: home_page_why_pick_us_three_description$1,
    il: home_page_why_pick_us_three_description$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_description_one = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_description_one$1,
    il: about_page_description_one$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_our_work_heading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_our_work_heading$1,
    il: about_page_our_work_heading$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_our_work_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_our_work_description$1,
    il: about_page_our_work_description$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_project_in_mind = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_project_in_mind$1,
    il: about_page_project_in_mind$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_our_process_title = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_our_process_title$1,
    il: about_page_our_process_title$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_our_process_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_our_process_description$1,
    il: about_page_our_process_description$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_fireproof_testing_heading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_fireproof_testing_heading$1,
    il: about_page_fireproof_testing_heading$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_fireproof_testing_subheading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_fireproof_testing_subheading$1,
    il: about_page_fireproof_testing_subheading$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_fireproof_testing_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_fireproof_testing_description$1,
    il: about_page_fireproof_testing_description$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_variations_of_resistance_heading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_variations_of_resistance_heading$1,
    il: about_page_variations_of_resistance_heading$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_variations_of_resistance_card_one_heading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_variations_of_resistance_card_one_heading$1,
    il: about_page_variations_of_resistance_card_one_heading$1
  }[options.languageTag ?? languageTag()]();
};
const about_page_variations_of_resistance_card_one_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: about_page_variations_of_resistance_card_one_description$1,
    il: about_page_variations_of_resistance_card_one_description$1
  }[options.languageTag ?? languageTag()]();
};
const contact_page_heading = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: contact_page_heading$1,
    il: contact_page_heading$1
  }[options.languageTag ?? languageTag()]();
};
const contact_page_description = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: contact_page_description$1,
    il: contact_page_description$1
  }[options.languageTag ?? languageTag()]();
};
export {
  about_page_our_process_description as $,
  home_page_why_pick_us_two_description as A,
  Button as B,
  home_page_why_pick_us_three_subheading as C,
  home_page_why_pick_us_three_description as D,
  home_page_process_one_title as E,
  FIRST_LAST_KEYS as F,
  home_page_process_one_description as G,
  home_page_process_two_title as H,
  home_page_process_two_description as I,
  home_page_process_three_title as J,
  home_page_process_three_description as K,
  home_page_landing_heading as L,
  home_page_landing_subheading as M,
  home_page_carousel_heading as N,
  home_page_carousel_description as O,
  home_page_process_heading as P,
  home_page_process_subheading as Q,
  read_about_us as R,
  SELECTION_KEYS as S,
  home_page_why_pick_us_title as T,
  about_fpt as U,
  about_page_description_one as V,
  about_page_our_work_heading as W,
  about_page_our_work_description as X,
  about_page_project_in_mind as Y,
  get_free_estimate as Z,
  about_page_our_process_title as _,
  isHTMLElement as a,
  about_page_fireproof_testing_heading as a0,
  about_page_fireproof_testing_subheading as a1,
  about_page_fireproof_testing_description as a2,
  about_page_variations_of_resistance_heading as a3,
  about_page_variations_of_resistance_card_one_heading as a4,
  about_page_variations_of_resistance_card_one_description as a5,
  name as a6,
  email as a7,
  message as a8,
  submit as a9,
  contact_page_heading as aa,
  contact_page_description as ab,
  isFunction as b,
  useEscapeKeydown as c,
  derivedWithUnsubscribe as d,
  executeCallbacks as e,
  effect as f,
  addMeltEventListener as g,
  safeOnMount as h,
  isBrowser as i,
  isElementDisabled as j,
  kbd as k,
  disabledAttr as l,
  addEventListener as m,
  noop as n,
  is_void as o,
  cn as p,
  flyAndScale as q,
  home as r,
  styleToString as s,
  about_us as t,
  useClickOutside as u,
  contact_us as v,
  find_us as w,
  home_page_why_pick_us_one_subheading as x,
  home_page_why_pick_us_one_description as y,
  home_page_why_pick_us_two_subheading as z
};
