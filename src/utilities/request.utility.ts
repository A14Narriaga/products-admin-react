type Headers = { [key: string]: string }

export const Request = {
	async post(url: string, headers: Headers, body: unknown): Promise<unknown> {
		const options: RequestInit = {
			method: "POST",
			headers,
			body: JSON.stringify(body)
		}
		const response: Response = await fetch(url, options)
		const resJSON: unknown = await response.json()
		if (!response.ok || ![200, 201].includes(response.status)) {
			// eslint-disable-next-line no-console
			console.log("Request POST error ==>", url, options, resJSON)
			throw new Error(response.statusText)
		}
		return resJSON
	},

	async get(url: string, headers: Headers): Promise<unknown> {
		const options: RequestInit = { method: "GET", headers }
		const response: Response = await fetch(url, options)
		const resJSON: unknown = await response.json()
		if (!response.ok || ![200, 201].includes(response.status)) {
			// eslint-disable-next-line no-console
			console.log("Request GET error ==>", url, options, resJSON)
			throw new Error(response.statusText)
		}
		return resJSON
	}
}

export default Request
