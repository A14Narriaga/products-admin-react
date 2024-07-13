import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import App from "@src/app"

test("HomePage", () => {
	render(<App />)
	expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined()
})
