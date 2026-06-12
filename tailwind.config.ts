import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lyra: {
          bg: "#0c0c0e",
          surface: "#18181b",
          border: "rgba(255,255,255,0.08)",
          accent: "#6366f1",
          "text-primary": "#f4f4f5",
          "text-secondary": "#71717a",
          "text-muted": "#52525b",
          published: {
            bg: "#dcfce7",
            text: "#166534",
          },
          draft: {
            bg: "#fef9c3",
            text: "#854d0e",
          },
          "dashboard-bg": "#f9f9f9",
        },
      },
      borderRadius: {
        card: "10px",
        button: "8px",
      },
      width: {
        "editor-panel": "400px",
      },
      size: {
        "avatar-preview": "60px",
      },
      height: {
        "site-preview": "140px",
        "template-preview": "200px",
        "editor-topbar": "48px",
        "about-placeholder": "300px",
      },
      maxWidth: {
        preview: "1440px",
        site: "1200px",
      },
      padding: {
        "hero-top": "120px",
        "section-y": "72px",
      },
      borderColor: {
        "sidebar-border": "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
