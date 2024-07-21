import { EStorage } from "@src/models"
import { ITEMS_PER_PAGE, Request, Storage } from "@src/utilities"

import { IProduct } from "../models"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string
if (!apiBaseUrl) throw new Error("Could not find VITE_API_BASE_URL")

const headers: { [key: string]: string } = {
	Accept: "application/json",
	"Content-Type": "application/json"
}

export const ProductsService = {
	async getAll(currentPage: number) {
		const token = Storage.getLocal(EStorage.TOKEN) as string
		headers.Authorization = `Bearer ${token}`
		const limit = ITEMS_PER_PAGE
		const offset = (currentPage - 1) * limit
		const url = `${apiBaseUrl}/products?limit=${limit}&offset=${offset}`
		const resJSON = await Request.get(url, headers)
		return resJSON
	},

	async remove(_id: string) {
		const token = Storage.getLocal(EStorage.TOKEN) as string
		headers.Authorization = `Bearer ${token}`
		const url = `${apiBaseUrl}/products/${_id}`
		const resJSON = await Request.delete(url, headers)
		return resJSON
	},

	async add(product: IProduct) {
		const token = Storage.getLocal(EStorage.TOKEN) as string
		headers.Authorization = `Bearer ${token}`
		const url = `${apiBaseUrl}/products`
		const body = product
		const resJSON = await Request.post(url, headers, body)
		return resJSON
	},

	async edit(_id: string, product: IProduct) {
		const token = Storage.getLocal(EStorage.TOKEN) as string
		headers.Authorization = `Bearer ${token}`
		const url = `${apiBaseUrl}/products/${_id}`
		const body = product
		const resJSON = await Request.patch(url, headers, body)
		return resJSON
	}
}
