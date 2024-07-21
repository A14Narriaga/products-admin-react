import { createContext } from "react"

import { IProduct } from "../models"

export interface IProductsActions {
	remove: (_id: string) => Promise<void>
	add: (product: IProduct) => Promise<void>
	edit: (_id: string, product: IProduct) => Promise<void>
	set: (currentPage: number) => Promise<void>
}

export interface IProductsState {
	total: number
	products: IProduct[]
}

export interface IProductsContextValue {
	productsState: IProductsState
	productsActions: IProductsActions
}

export const ProductsContext = createContext<IProductsContextValue | undefined>(
	undefined
)
