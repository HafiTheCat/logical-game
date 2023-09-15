const config = {
	mode: "jit",
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {
			fontFamily: {
				oswald: ["Oswald", "sans-serif"],
			},
			colors: {
				base: "#f2efee",
				accent1: "#2c2d2b",
				accent2: {
					300: "#F1EEF0",
					400: "#E5E1E4",
					500: "#dfdadd",
					600: "#B2AEB1",
					700: "#646263",
				},
				accent3: "#d85b35",
				accent3: "#43b48a",
			},
		},
	},

	plugins: [require("@tailwindcss/typography")],
};

module.exports = config;
