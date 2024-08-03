import { IGetRequest } from "@src/models"

const defaultHeaders: { [key: string]: string } = {
	Accept: "application/json",
	"Content-Type": "application/json"
}

export const RequesService = {
	get: async ({ url, headers = defaultHeaders }: IGetRequest) => {
		const response = await fetch(url, headers)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const responseJSON = await response.json()
		// eslint-disable-next-line no-console
		console.log(responseJSON)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { data } = responseJSON
		return data as unknown
	}
}
