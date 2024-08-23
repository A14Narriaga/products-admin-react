import { RequesService } from "@src/services"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string
if (!apiBaseUrl) throw new Error("Could not find VITE_API_BASE_URL")

export const AuthService = {
	async login(email: string, password: string) {
		const url = `${apiBaseUrl}/auth/login`
		const body = { email, password }
		const headers = {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
		const resJSON = await RequesService.post({ url, headers, body })
		return resJSON
	},

	async getUser(token: string) {
		const url = `${apiBaseUrl}/auth/refresh-token`
		const headers = {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
		const resJSON = await RequesService.get({ url, headers })
		return resJSON
	}
}
