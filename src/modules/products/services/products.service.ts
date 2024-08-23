import { EStorage } from "@src/models"
import { Storage } from "@src/utilities"

import { IProduct } from "../models"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string
if (!apiBaseUrl) throw new Error("Could not find VITE_API_BASE_URL")

const headers: { [key: string]: string } = {
	Accept: "application/json",
	"Content-Type": "application/json"
}

export const ProductsService = {
	getAllProps(currentPage: number) {
		const token = Storage.getLocal(EStorage.TOKEN) as string
		headers.Authorization = `Bearer ${token}`
		const limit = 10
		const offset = (currentPage - 1) * limit
		const url = `${apiBaseUrl}/products`
		const params = { limit, offset }
		return { url, headers, params }
	},

	removeProps(_id: string) {
		const token = Storage.getLocal(EStorage.TOKEN) as string
		headers.Authorization = `Bearer ${token}`
		const url = `${apiBaseUrl}/products/${_id}`
		return { url, headers }
	},

	addProps(product: IProduct) {
		const token = Storage.getLocal(EStorage.TOKEN) as string
		headers.Authorization = `Bearer ${token}`
		const url = `${apiBaseUrl}/products`
		const body = product
		return { url, headers, body }
	},

	editProps(_id: string, product: IProduct) {
		const token = Storage.getLocal(EStorage.TOKEN) as string
		headers.Authorization = `Bearer ${token}`
		const url = `${apiBaseUrl}/products/${_id}`
		const body = product
		return { url, headers, body }
	}
}
