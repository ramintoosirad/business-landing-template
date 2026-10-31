# Business Landing Page Template

A fast, responsive, accessible landing page template for clinics and service businesses — built with **semantic HTML, modern CSS and vanilla JavaScript**. No frameworks, no build step.

**Live demo:** https://ramintoosirad.github.io/business-landing-template/

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Features

- 📱 **Mobile-first & responsive** — looks great from 320px phones to large desktops
- 🌙 **Automatic dark mode** using `prefers-color-scheme`
- ♿ **Accessible** — skip link, keyboard-friendly navigation, ARIA attributes, visible focus states, reduced-motion support
- ⚡ **Fast** — no dependencies, a single CSS file and a small JS file
- 🧩 **Sections:** sticky header with mobile menu, hero with animated stats, services grid, 3-step process, testimonial slider, pricing with monthly/yearly toggle, FAQ accordion and booking form
- ✅ **Client-side form validation** with inline error messages
- 🎨 **Easy theming** — change the brand colours in one place (`:root` custom properties)

## Getting started

```bash
git clone https://github.com/ramintoosirad/business-landing-template.git
cd business-landing-template
# open index.html in your browser — no build step needed
```

## Customising

| What | Where |
|------|-------|
| Brand colours | `style.css` → `:root` (`--primary`, `--primary-2`) |
| Text & sections | `index.html` |
| Prices | `data-single` / `data-yearly` attributes in the pricing section |
| Form submission | `script.js` → replace the comment in the submit handler with a `fetch()` to your backend |

## Project structure

```
├── index.html   # markup and content
├── style.css    # all styles (mobile-first)
└── script.js    # menu, scroll reveal, counters, slider, pricing toggle, form validation
```

## License

MIT — free to use for personal and commercial projects.

---

Built by **[Vortaxis Studio](https://vortaxis.com)** — web design & development, UK.
