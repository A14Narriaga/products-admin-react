import { ReactNode, useEffect, useReducer } from "react"

import { EProductStatus, IGetProductsResponse, INewProduct } from "@src/models"

import {
	IProductsContextValue,
	IProductsState,
	ProductsContext
} from "./products.context"
import { productReducer, TProductsAction } from "./products.reducer"
import { ProductsService } from "./products.service"

interface ProductsProviderProps {
	children: ReactNode
}

const initialState: IProductsState = {
	products: [],
	total: 0
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
	const [productsState, dispatch] = useReducer(productReducer, initialState)

	useEffect(() => {
		void set(1)
	}, [])

	const set = async (currentPage: number) => {
		const { products, total } = (await ProductsService.getAll(
			currentPage
		)) as IGetProductsResponse
		const action: TProductsAction = {
			type: EProductStatus.SET,
			payload: { products, total }
		}
		dispatch(action)
	}

	const remove = async (_id: string) => {
		await ProductsService.remove(_id)
		const action: TProductsAction = {
			type: EProductStatus.REMOVE,
			payload: { _id }
		}
		dispatch(action)
	}

	const add = async (product: INewProduct) => {
		await ProductsService.add(product)
		const action: TProductsAction = {
			type: EProductStatus.ADD,
			payload: { product }
		}
		dispatch(action)
	}

	const edit = async (_id: string, product: INewProduct) => {
		await ProductsService.edit(_id, product)
		const action: TProductsAction = {
			type: EProductStatus.EDIT,
			payload: { _id, product }
		}
		dispatch(action)
	}

	const value: IProductsContextValue = {
		productsState,
		productsActions: {
			set,
			remove,
			add,
			edit
		}
	}

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	)
}
