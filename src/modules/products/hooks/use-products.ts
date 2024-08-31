import { useEffect, useReducer } from "react"

import { EProductStatus } from "@src/models"
import { ERequestStatus, useRequest } from "@src/services"

import {
	IGetProductsResponse,
	INewProduct,
	IProduct,
	IProductsState
} from "../models"
import { productReducer, TProductsAction } from "../reducers"
import { ProductsService } from "../services"

export interface IRequestState {
	loading: boolean
	status: ERequestStatus
}

interface IProductsActions {
	remove: {
		action: (_id: string) => Promise<void>
		state: { loading: boolean; status: ERequestStatus }
	}
	add: {
		action: (product: IProduct) => Promise<void>
		state: { loading: boolean; status: ERequestStatus }
	}
	edit: {
		action: (_id: string, product: IProduct) => Promise<void>
		state: { loading: boolean; status: ERequestStatus }
	}
	set: {
		action: (currentPage: number) => Promise<void>
		state: { loading: boolean; status: ERequestStatus }
	}
}

interface IProductsContextValue {
	productsState: IProductsState
	productsActions: IProductsActions
}

const initialStateProducts: IProductsState = {
	products: [],
	total: 0
}

export const useProducts = () => {
	const [productsState, dispatch] = useReducer(
		productReducer,
		initialStateProducts
	)

	const { getRequest } = useRequest()
	const { state: getState, action: get } = getRequest
	const { data: prods, ..._getState } = getState

	const { deleteRequest } = useRequest()
	const { state: deleteState, action: _delete } = deleteRequest
	const { data: resDelete, ..._deleteState } = deleteState

	const { postRequest } = useRequest()
	const { state: postState, action: post } = postRequest
	const { data: resPost, ..._postState } = postState

	const { patchRequest } = useRequest()
	const { state: patchState, action: patch } = patchRequest
	const { data: resPatch, ..._patchState } = patchState

	useEffect(() => {
		void set(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!prods) return
		const { products, total } = prods as IGetProductsResponse
		const action: TProductsAction = {
			type: EProductStatus.SET,
			payload: { products, total }
		}
		dispatch(action)
	}, [prods])

	useEffect(() => {
		if (!resDelete) return
		const { _id } = resDelete as IProduct
		const action: TProductsAction = {
			type: EProductStatus.REMOVE,
			payload: { _id }
		}
		dispatch(action)
	}, [resDelete])

	useEffect(() => {
		if (!resPatch) return
		const product = resPatch as IProduct
		const { _id } = product
		const action: TProductsAction = {
			type: EProductStatus.EDIT,
			payload: { _id, product }
		}
		dispatch(action)
	}, [resPatch])

	useEffect(() => {
		if (!resPost) return
		const product = resPost as IProduct
		const action: TProductsAction = {
			type: EProductStatus.ADD,
			payload: { product }
		}
		dispatch(action)
	}, [resPost])

	const set = async (currentPage: number) => {
		const props = ProductsService.getAllProps(currentPage)
		await get(props)
	}

	const remove = async (_id: string) => {
		const props = ProductsService.removeProps(_id)
		await _delete(props)
	}

	const add = async (product: INewProduct) => {
		const props = ProductsService.addProps(product)
		await post(props)
	}

	const edit = async (_id: string, product: INewProduct) => {
		const props = ProductsService.editProps(_id, product)
		await patch(props)
	}

	const value: IProductsContextValue = {
		productsState,
		productsActions: {
			set: { action: set, state: _getState },
			remove: { action: remove, state: _deleteState },
			add: { action: add, state: _postState },
			edit: { action: edit, state: _patchState }
		}
	}

	return value
}
