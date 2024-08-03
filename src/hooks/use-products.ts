import { useEffect, useReducer, useState } from "react"

import { EProductStatus, ERequestStatus } from "@src/models"
import {
	IGetProductsResponse,
	INewProduct,
	IProduct,
	IProductsState
} from "@src/modules/products/models"
import { productReducer, TProductsAction } from "@src/modules/products/reducers"
import { ProductsService } from "@src/modules/products/services"

export interface IRequestState {
	loading: boolean
	status: ERequestStatus
}

interface IProductsActions {
	remove: (_id: string) => Promise<void>
	add: (product: IProduct) => Promise<void>
	edit: (_id: string, product: IProduct) => Promise<void>
	set: (currentPage: number) => Promise<void>
}

interface IProductsContextValue {
	requestState: IRequestState
	productsState: IProductsState
	productsActions: IProductsActions
}

const initialStateProducts: IProductsState = {
	products: [],
	total: 0
}

const initialStateRequest: IRequestState = {
	loading: false,
	status: ERequestStatus.PENDING
}

export const useProducts = () => {
	const [productsState, dispatch] = useReducer(
		productReducer,
		initialStateProducts
	)
	const [requestState, setRequestState] =
		useState<IRequestState>(initialStateRequest)

	useEffect(() => {
		void set(1)
	}, [])

	const set = async (currentPage: number) => {
		try {
			setRequestState({ ...initialStateRequest, loading: true })
			const { products, total } = (await ProductsService.getAll(
				currentPage
			)) as IGetProductsResponse
			const action: TProductsAction = {
				type: EProductStatus.SET,
				payload: { products, total }
			}
			dispatch(action)
			setRequestState({
				...initialStateRequest,
				status: ERequestStatus.SUCCESS
			})
		} catch (error) {
			setRequestState({
				...initialStateRequest,
				status: ERequestStatus.ERROR
			})
			// eslint-disable-next-line no-console
			console.error("useRequest products [get]", error)
		}
	}

	const remove = async (_id: string) => {
		try {
			setRequestState({ ...initialStateRequest, loading: true })
			await ProductsService.remove(_id)
			const action: TProductsAction = {
				type: EProductStatus.REMOVE,
				payload: { _id }
			}
			dispatch(action)
			setRequestState({
				...initialStateRequest,
				status: ERequestStatus.SUCCESS
			})
		} catch (error) {
			setRequestState({
				...initialStateRequest,
				status: ERequestStatus.ERROR
			})
			// eslint-disable-next-line no-console
			console.error("useRequest products [delete]", error)
		}
	}

	const add = async (product: INewProduct) => {
		try {
			setRequestState({ ...initialStateRequest, loading: true })
			await ProductsService.add(product)
			const action: TProductsAction = {
				type: EProductStatus.ADD,
				payload: { product }
			}
			dispatch(action)
			setRequestState({
				...initialStateRequest,
				status: ERequestStatus.SUCCESS
			})
		} catch (error) {
			setRequestState({
				...initialStateRequest,
				status: ERequestStatus.ERROR
			})
			// eslint-disable-next-line no-console
			console.error("useRequest products [post]", error)
		}
	}

	const edit = async (_id: string, product: INewProduct) => {
		try {
			setRequestState({ ...initialStateRequest, loading: true })
			await ProductsService.edit(_id, product)
			const action: TProductsAction = {
				type: EProductStatus.EDIT,
				payload: { _id, product }
			}
			dispatch(action)
			setRequestState({
				...initialStateRequest,
				status: ERequestStatus.SUCCESS
			})
		} catch (error) {
			setRequestState({
				...initialStateRequest,
				status: ERequestStatus.ERROR
			})
			// eslint-disable-next-line no-console
			console.error("useRequest products [patch]", error)
		}
	}

	const value: IProductsContextValue = {
		requestState,
		productsState,
		productsActions: {
			set,
			remove,
			add,
			edit
		}
	}

	return value
}
