import path from "node:path"

import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/

const port = Number(process.env.PORT) || 4000

export default defineConfig({
	base: "./",
	plugins: [react()],
  resolve: {
		alias: {
			"@src": path.resolve(__dirname, "./src"),
			"@tests": path.resolve(__dirname, "./tests")
		}
	},
	server: {
		port,
		strictPort: true,
		host: true,
		origin: `http://0.0.0.0:${port}`
	}
})
