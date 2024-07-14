import { ReactNode, useReducer } from "react"
import { v4 as uuidv4 } from "uuid"

import { EProductStatus, IProduct } from "@src/models"

import { IProductsContextValue, ProductsContext } from "./products.context"
import { productReducer, TProductsAction } from "./products.reducer"

interface ProductsProviderProps {
	children: ReactNode
}

const initialState: IProduct[] = [
	{
		_id: uuidv4(),
		name: "Product 1",
		price: 10.99,
		stock: 50
	}
]

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
	const [products, dispatch] = useReducer(productReducer, initialState)

	const remove = (_id: string) => {
		const action: TProductsAction = {
			type: EProductStatus.REMOVE,
			payload: { _id }
		}
		dispatch(action)
	}

	const add = (product: IProduct) => {
		const action: TProductsAction = {
			type: EProductStatus.ADD,
			payload: { product }
		}
		dispatch(action)
	}

	const edit = (_id: string, product: IProduct) => {
		const action: TProductsAction = {
			type: EProductStatus.EDIT,
			payload: { _id, product }
		}
		dispatch(action)
	}

	const value: IProductsContextValue = {
		products,
		productsActions: {
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
