/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
      colors: {
        colorPrimary: 'rgb(var(--color-primary))',
        colorPrimaryHover: 'rgb(var(--color-primary-hover))',
        colorPrimaryFocus: 'rgb(var(--color-primary-focus))',
        colorSecondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        colorBackground: 'rgb(var(--color-background) / <alpha-value>)',
        colorBackgroundAlt: 'rgb(var(--color-background-alt) / <alpha-value>)',
        colorTextPrimary: 'rgb(var(--color-text-primary) / <alpha-value>)',
        colorTextSecondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        colorBorder: 'rgb(var(--color-border) / <alpha-value>)',
        colorAccent: 'rgb(var(--color-accent) / <alpha-value>)',
        colorSuccess: 'rgb(var(--color-success) / <alpha-value>)',
        colorDanger: 'rgb(var(--color-danger) / <alpha-value>)',
        colorWarning: 'rgb(var(--color-warning) / <alpha-value>)',
        colorInfo: 'rgb(var(--color-info) / <alpha-value>)',
      },
    }
	},
	plugins: []
}
