import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
