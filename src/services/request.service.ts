import { IGetRequest } from "@src/models"

export const RequesService = {
	get: async ({ url, headers }: IGetRequest) => {
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
