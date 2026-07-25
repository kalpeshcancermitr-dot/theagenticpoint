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
          DEFAULT: '#4F8CFF',
          foreground: '#FFFFFF',
          50: '#EBF2FF',
          100: '#D6E5FF',
          200: '#ADCAFF',
          300: '#85B0FF',
          400: '#6A9EFF',
          500: '#4F8CFF',
          600: '#2B70FF',
          700: '#0754FF',
          800: '#0043D6',
          900: '#0032A3',
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
          DEFAULT: '#6EE7F9',
          foreground: '#050816',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'rgba(255,255,255,0.08)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        brand: {
          bg: '#050816',
          surface: '#0D1323',
          card: '#131B31',
          primary: '#4F8CFF',
          accent: '#6EE7F9',
          success: '#00D084',
          text: '#FFFFFF',
          secondary: '#A7B1C2',
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
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        tight: ['Figtree', 'Inter Tight', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(79,140,255,0.2) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(79,140,255,0.06) 0%, rgba(110,231,249,0.03) 100%)',
        'primary-gradient': 'linear-gradient(135deg, #4F8CFF 0%, #6EE7F9 100%)',
        'success-gradient': 'linear-gradient(135deg, #00D084 0%, #6EE7F9 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(79, 140, 255, 0.3)',
        'glow': '0 0 30px rgba(79, 140, 255, 0.25)',
        'glow-lg': '0 0 60px rgba(79, 140, 255, 0.2)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 20px 60px rgba(79, 140, 255, 0.12)',
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
          '50%': { transform: 'translateY(-16px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'spin-slow': 'spin-slow 20s linear infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        blink: 'blink 1s step-end infinite',
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
