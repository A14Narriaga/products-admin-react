import {
	IDeleteRequest,
	IGetRequest,
	IPatchRequest,
	IPostRequest
} from "./request.model"
import { paramsObjToString } from "./request.utility"

const get = async ({ url, headers, params }: IGetRequest): Promise<unknown> => {
	const method = "GET"
	const _params = params ? paramsObjToString(params) : ""
	const fullUrl = `${url}${_params}`
	const options: RequestInit = { method, headers }
	const response: Response = await fetch(fullUrl, options)
	const resJSON: unknown = await response.json()
	if (!response.ok || ![200, 201].includes(response.status)) {
		throw new Error(response.statusText)
	}
	return resJSON
}

const post = async ({ url, headers, body }: IPostRequest): Promise<unknown> => {
	const method = "POST"
	const _body = JSON.stringify(body)
	const options: RequestInit = { method, headers, body: _body }
	const response: Response = await fetch(url, options)
	const resJSON: unknown = await response.json()
	if (!response.ok || ![200, 201].includes(response.status)) {
		throw new Error(response.statusText)
	}
	return resJSON
}

const patch = async ({
	url,
	headers,
	body
}: IPatchRequest): Promise<unknown> => {
	const method = "PATCH"
	const _body = JSON.stringify(body)
	const options: RequestInit = { method, headers, body: _body }
	const response: Response = await fetch(url, options)
	const resJSON: unknown = await response.json()
	if (!response.ok || ![200, 201].includes(response.status)) {
		throw new Error(response.statusText)
	}
	return resJSON
}

const _delete = async ({ url, headers }: IDeleteRequest): Promise<unknown> => {
	const method = "DELETE"
	const options: RequestInit = { method, headers }
	const response: Response = await fetch(url, options)
	const resJSON: unknown = await response.json()
	if (!response.ok || ![200, 201].includes(response.status)) {
		throw new Error(response.statusText)
	}
	return resJSON
}

export const RequesService = {
	get,
	post,
	patch,
	delete: _delete
}
