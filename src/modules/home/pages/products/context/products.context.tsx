import { createContext } from "react"

import { IProduct } from "@src/models"

export interface IProductsActions {
	remove: (_id: string) => void
	add: (product: IProduct) => void
	edit: (_id: string, product: IProduct) => void
}

export interface IProductsContextValue {
	products: IProduct[]
	productsActions: IProductsActions
}

export const ProductsContext = createContext<IProductsContextValue | undefined>(
	undefined
)
