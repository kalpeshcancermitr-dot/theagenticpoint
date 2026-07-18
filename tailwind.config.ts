import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card-bg))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#2862d7',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '#625fff',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: '#172540',
        input: 'hsl(var(--input))',
        ring: '#2862d7',
        // Design system surfaces
        void: '#0b0c0e',
        abyss: '#0e111b',
        'deep-sea': '#0d172b',
        'cobalt-panel': '#12244f',
        'frosted-lilac': '#85a6e9',
        'signal-blue': '#2862d7',
        'pulse-violet': '#305fbd',
        quartz: '#ffffff',
        ash: '#abaebb',
        mist: '#c7c9d1',
        slate: '#3c3f44',
        'obsidian-edge': '#172540',
        inkline: '#151e32',
        'sapphire-hairline': '#24375a',
        // Legacy brand aliases (keep for backward compat)
        brand: {
          bg: '#0b0c0e',
          surface: '#0e111b',
          card: '#0d172b',
          primary: '#2862d7',
          accent: '#625fff',
          success: '#22c55e',
          text: '#ffffff',
          secondary: '#abaebb',
        },
        chart: {
          '1': 'hsl(var(--chart-1, 218 100% 64%))',
          '2': 'hsl(var(--chart-2, 191 92% 75%))',
          '3': 'hsl(var(--chart-3, 152 84% 41%))',
          '4': 'hsl(var(--chart-4, 43 74% 66%))',
          '5': 'hsl(var(--chart-5, 27 87% 67%))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: '2px',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Figtree', 'DM Sans', 'Outfit', 'sans-serif'],
        tight: ['Figtree', 'DM Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora-purple': 'radial-gradient(79.43% 95.88% at 38.94% -53.46%, rgba(98, 95, 255, 0.38) 0px, rgba(0,0,0,0) 100%)',
        'aurora-pink': 'radial-gradient(27.99% 22.08% at 72.13% 103.46%, rgba(255, 125, 218, 0.33) 0px, rgba(0,0,0,0) 100%)',
        'accent-gradient': 'linear-gradient(90deg, #305fbd, #625fff)',
        'primary-gradient': 'linear-gradient(90deg, #305fbd, #625fff)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(98,95,255,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(18,36,79,0.4) 0%, rgba(13,23,43,0.6) 100%)',
        'success-gradient': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      },
      boxShadow: {
        'card': 'rgba(0,0,0,0.5) 0px 4px 30px 0px',
        'card-hover': 'rgba(0,0,0,0.5) 0px 20px 35px 0px, rgba(0,0,0,0.25) 0px 4px 13px 0px',
        'inner-glow': 'rgba(255,255,255,0.35) 0px 2px 14px 0px',
        'link': 'rgba(0,0,0,0.2) 0px 3px 16px 0px',
        'glow-sm': '0 0 20px rgba(98,95,255,0.2)',
        'glow': '0 0 40px rgba(98,95,255,0.15)',
        'glow-lg': '0 0 60px rgba(98,95,255,0.12)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.9' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        marquee: 'marquee 35s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        blink: 'blink 1s step-end infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
