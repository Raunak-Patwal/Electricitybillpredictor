import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        black: {
          "base-100": "oklch(13% 0.028 261.692)",
          "base-200": "oklch(21% 0.034 264.665)",
          "base-300": "oklch(27% 0.033 256.848)",
          "base-content": "oklch(96% 0.003 264.542)",
          "primary": "oklch(43% 0 0)",
          "primary-content": "oklch(98% 0 0)",
          "secondary": "oklch(62% 0.194 149.214)",
          "secondary-content": "oklch(98% 0.018 155.826)",
          "accent": "oklch(58% 0.253 17.585)",
          "accent-content": "oklch(96% 0.015 12.422)",
          "neutral": "oklch(27% 0.033 256.848)",
          "neutral-content": "oklch(98% 0.002 247.839)",
          "info": "oklch(62% 0.214 259.815)",
          "info-content": "oklch(97% 0.014 254.604)",
          "success": "oklch(72% 0.219 149.579)",
          "success-content": "oklch(98% 0.018 155.826)",
          "warning": "oklch(76% 0.188 70.08)",
          "warning-content": "oklch(98% 0.022 95.277)",
          "error": "oklch(64% 0.246 16.439)",
          "error-content": "oklch(96% 0.015 12.422)",
        },
      },
      "dark", // optional fallback
    ],
  },
};
