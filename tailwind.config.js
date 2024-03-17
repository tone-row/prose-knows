const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        background: "#fdfcfe",
        foreground: "#020103",
        neutral: {
          50: "#faf9fb",
          100: "#f5f4f7",
          200: "#e7e5e9",
          300: "#d5d3d7",
          400: "#a4a1a6",
          500: "#747176",
          600: "#555258",
          700: "#423f45",
          800: "#29262c",
          900: "#1a17d",
        },
      },
      borderRadius: {
        sm: "0.0625rem",
        default: "0.125rem",
        md: "0.375rem",
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1.1667rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        /* remove the default margin from paragraphs */
        DEFAULT: {
          css: {
            p: {
              marginTop: "1em !important",
              marginBottom: "1em !important",
            },
            a: {
              fontWeight: "400",
              textDecorationThickness: "0.025em",
              textDecorationSkipInk: "auto",
              textUnderlineOffset: "0.1em",
              // textUnderlinePosition: "under",
            },
          },
        },
        lg: {
          css: [
            {
              fontSize: rem(18),
              lineHeight: round(23 / 18),
            },
          ],
        },
        xl: {
          css: [
            {
              fontSize: rem(20),
              lineHeight: round(25.5 / 20),
            },
            {
              pre: {
                fontSize: rem(16),
                lineHeight: round(20 / 16),
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
