import { IParams } from "./request.model"

export const paramsObjToString = (params: IParams) => {
	const _params = Object.entries(params)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
		)
		.join("&")
	return `?${_params}`
}
