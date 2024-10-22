/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      barlow: ["Barlow Condensed", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "1.125rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.125rem",
          letterSpacing: "0.01rem",
        },
      ],
      md: [
        "0.9rem",
        {
          lineHeight: "1.375rem",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "1.875rem",
          letterSpacing: "-0.015rem",
        },
      ],
      xl2: [
        "1.5rem",
        {
          lineHeight: "2.25rem",
          letterSpacing: "-0.015rem",
        },
      ],
      xl3: [
        "2rem",
        {
          lineHeight: "3rem",
        },
      ],
      xl4: [
        "2.5rem",
        {
          lineHeight: "3.75rem",
        },
      ],
      xl5: [
        "3rem",
        {
          lineHeight: "4.5rem",
        },
      ],
      xl6: [
        "3.5rem",
        {
          lineHeight: "5.25rem",
        },
      ],
      xl7: [
        "4rem",
        {
          lineHeight: "3.375rem",
        },
      ],
      xl8: [
        "4.5rem",
        {
          lineHeight: "6.75rem",
        },
      ],
    },
    letterSpacing: {
      tightest: "-.03rem",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsla(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        ghost: {
          DEFAULT: "hsla(var(--ghost))",
          foreground: "hsla(var(--ghost-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
