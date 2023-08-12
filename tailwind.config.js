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
        "sp-white": "#e6eaee",
        "sp-green": "#20281c",
        "sp-main": "#e91e63",
      },
      screens: {
        xss: "240px",
        ms: "360px",
        xs: "470px",
      },
      keyframes: {
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slide: {
          "0%": { transform: "translateY(-10%)", opacity: 0 },
          "50%": { opacity: 0.3 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        shake: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        appear: "appear 1s ease-in-out",
        slide: "slide 0.2s ease-in-out",
        shake: "shake 0.25s ease-in-out",
      },
    },
  },
  darkMode: "class",
  plugins: [aspectRatio, backfaceVisibility, translateZ],
}
