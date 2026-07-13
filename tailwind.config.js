/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#11304A',
          deep: '#0A1D48',
          ink: '#0E0054',
          900: '#0A1D48',
          800: '#11304A',
          700: '#1B4362',
          600: '#2A5877',
        },
        ocean: {
          DEFAULT: '#00649D',
          dark: '#00426B',
          light: '#007AFF',
        },
        muted: '#476276',
        sky: {
          soft: '#D6F0FF',
          faint: '#F5FBFF',
          mist: '#FBFEFF',
        },
        charcoal: '#3F3F3F',
        hairline: '#ECECEC',
        crimson: '#A00C30',
        // Accent drawn from the Searah mark (gold → ember flame)
        ember: {
          DEFAULT: '#F2A03D',
          gold: '#FBBF3C',
          deep: '#E2622A',
          red: '#D8322A',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        ui: ['Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.2', fontWeight: '400' }],
        h2: ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['1.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        body: ['1.125rem', { lineHeight: '1.556' }],
        'body-sm': ['1rem', { lineHeight: '1.5' }],
        label: ['0.97rem', { lineHeight: '1.4', fontWeight: '700' }],
        nav: ['0.9rem', { lineHeight: '1.4', fontWeight: '700' }],
        caption: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: { 18: '4.5rem', 22: '5.5rem', 26: '6.5rem', 30: '7.5rem' },
      maxWidth: { container: '1440px', prose: '68ch' },
      borderRadius: { btn: '6px', field: '8px', card: '24px', xl2: '32px' },
      boxShadow: {
        raised: '0px 1px 3px rgba(0, 0, 0, 0.05)',
        lifted: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        floating: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        high: '0px 12px 32px rgba(0, 0, 0, 0.2)',
      },
      transitionTimingFunction: { premium: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'page-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        marquee: 'marquee 44s linear infinite',
        // The route entrance. CSS rather than JS: a dropped frame leaves the page at its
        // resting opacity, where a stalled JS animation would leave it invisible.
        'page-in': 'page-in 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
