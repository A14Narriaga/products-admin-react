export interface INewProduct {
	_id: string
	name: string
	price: number
	stock: number
}

export interface IProduct extends INewProduct {
	_id: string
}

export const ProductProps = ["name", "price", "stock"]
