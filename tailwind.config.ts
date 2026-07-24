import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        jungle: "#16281F",
        canopy: "#243A2C",
        moss:   "#3D5A45",
        flor:   "#C4685A",
        florLt: "#DA8B7D",
        arena:  "#EDE4D6",
        papel:  "#FAF7F2",
        mar:    "#7DA49E",
        tinta:  "#171A17",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "1180px" },
    },
  },
  plugins: [],
} satisfies Config;
