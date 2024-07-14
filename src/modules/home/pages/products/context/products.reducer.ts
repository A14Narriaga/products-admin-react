import { EProductStatus, IProduct } from "@src/models"

export type TProductsAction =
	| { type: EProductStatus.ADD; payload: { product: IProduct } }
	| { type: EProductStatus.REMOVE; payload: { _id: string } }
	| { type: EProductStatus.EDIT; payload: { _id: string; product: IProduct } }

export const productReducer = (state: IProduct[], action: TProductsAction) => {
	const { type, payload } = action
	switch (type) {
		case EProductStatus.ADD: {
			const { product } = payload
			return [product, ...state]
		}
		case EProductStatus.EDIT: {
			const { _id, product } = payload
			const newState = state.map((stateProduct) => {
				if (stateProduct._id === _id) {
					return { ...stateProduct, ...product }
				}
				return stateProduct
			})
			return newState
		}
		case EProductStatus.REMOVE: {
			const { _id } = payload
			const newState = state.filter((product) => product._id !== _id)
			return newState
		}
		default: {
			return state
		}
	}
}
