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
          foreground: '#FFFFFF',
          50: '#EEF3FC',
          100: '#D6E4F8',
          200: '#ADCAEF',
          300: '#85B0E5',
          400: '#5C96DC',
          500: '#2862d7',
          600: '#1F4FB0',
          700: '#173C88',
          800: '#0F2960',
          900: '#081738',
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
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'rgba(255,255,255,0.08)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        brand: {
          bg: '#0b0c0e',
          surface: '#0e111b',
          card: '#0d172b',
          highlight: '#12244f',
          primary: '#2862d7',
          accent: '#625fff',
          pink: '#ff7dda',
          success: '#3bdc8c',
          text: '#ffffff',
          secondary: '#abaebb',
          tertiary: '#c7c9d1',
          edge: '#172540',
          inkline: '#151e32',
          hairline: '#24375a',
        },
        chart: {
          '1': 'hsl(var(--chart-1, 220 70% 50%))',
          '2': 'hsl(var(--chart-2, 246 100% 67%))',
          '3': 'hsl(var(--chart-3, 318 100% 74%))',
          '4': 'hsl(var(--chart-4, 43 74% 66%))',
          '5': 'hsl(var(--chart-5, 152 84% 41%))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '12px',
        '2xl': '12px',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        tight: ['Figtree', 'DM Sans', 'Outfit', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-aurora': 'radial-gradient(79.43% 95.88% at 38.94% -53.46%, rgba(98, 95, 255, 0.38) 0px, rgba(0, 0, 0, 0))',
        'hero-plasma': 'radial-gradient(27.99% 22.08% at 72.13% 103.46%, rgba(255, 125, 218, 0.33) 0px, rgba(0, 0, 0, 0))',
        'accent-gradient': 'linear-gradient(90deg, #305fbd 0%, #625fff 100%)',
      },
      boxShadow: {
        'md': 'rgba(0, 0, 0, 0.2) 0px 3px 16px 0px',
        'xl': 'rgba(0, 0, 0, 0.5) 0px 4px 30px 0px',
        'xl-2': 'rgba(0, 0, 0, 0.34) 0px 20px 35px 0px, rgba(0, 0, 0, 0.25) 0px 4px 13px 0px',
        'md-2': 'rgba(255, 255, 255, 0.35) 0px 2px 14px 0px',
        'xl-3': 'rgba(0, 0, 0, 0.35) 0px 20px 34px 0px',
        'subtle': 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px',
        'card': 'rgba(0, 0, 0, 0.5) 0px 4px 30px 0px',
        'card-hover': 'rgba(0, 0, 0, 0.5) 0px 8px 40px 0px',
        'float': 'rgba(0, 0, 0, 0.34) 0px 20px 35px 0px, rgba(0, 0, 0, 0.25) 0px 4px 13px 0px',
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
          '50%': { opacity: '0.85' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'spin-slow': 'spin-slow 20s linear infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        blink: 'blink 1s step-end infinite',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'slide-up': 'slide-up 0.3s ease-out forwards',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'page': '1200px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
