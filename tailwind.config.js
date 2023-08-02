import aspectRatio from "@tailwindcss/aspect-ratio"
import plugin from "tailwindcss/plugin"

const backfaceVisibility = plugin(({ addUtilities }) => {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
      "-moz-backface-visibility": "visible",
      "-webkit-backface-visibility": "visible",
      "-ms-backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
      "-moz-backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden",
      "-ms-backface-visibility": "hidden",
    },
  })
})

const translateZ = plugin(({ matchUtilities }) =>
  matchUtilities({
    "translate-z": (value) => ({
      "--tw-translate-z": value,
      transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
    }),
  })
)

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sp-black": "#121212",
        "sp-gray": "#1e2125",
        "sp-light": "#5c6369",
        "sp-white": "#c6ccd1",
        "sp-green": "#20281c",
        "sp-main": "#e91e63",
      },
      screens: {
        xss: "240px",
        ms: "360px",
        xs: "470px",
      },
    },
  },
  plugins: [aspectRatio, backfaceVisibility, translateZ],
}
