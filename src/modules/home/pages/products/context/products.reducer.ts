import { EProductStatus, IProduct } from "@src/models"

import { IProductsState } from "./products.context"

export type TProductsAction =
	| { type: EProductStatus.ADD; payload: { product: IProduct } }
	| { type: EProductStatus.REMOVE; payload: { _id: string } }
	| { type: EProductStatus.EDIT; payload: { _id: string; product: IProduct } }
	| {
			type: EProductStatus.SET
			payload: { products: IProduct[]; total: number }
	  }

export const productReducer = (
	state: IProductsState,
	action: TProductsAction
) => {
	const { type, payload } = action
	switch (type) {
		case EProductStatus.SET: {
			const { products, total } = payload
			return { ...state, products: [...products], total }
		}
		case EProductStatus.ADD: {
			const { product } = payload
			return { ...state, products: [product, ...state.products] }
		}
		case EProductStatus.EDIT: {
			const { _id, product } = payload
			const newState = {
				...state,
				products: state.products.map((stateProduct) => {
					if (stateProduct._id === _id) {
						return { ...stateProduct, ...product }
					}
					return stateProduct
				})
			}
			return newState
		}
		case EProductStatus.REMOVE: {
			const { _id } = payload
			const newState = {
				...state,
				products: state.products.filter((product) => product._id !== _id)
			}
			return newState
		}
		default: {
			return state
		}
	}
}
