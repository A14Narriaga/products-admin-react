import { IProduct } from "./product.interface"

export interface IGetProductsResponse {
	products: IProduct[]
	total: number
}
