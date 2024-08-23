import { useState } from "react"

import {
	ERequestStatus,
	IDeleteRequest,
	IGetRequest,
	IPatchRequest,
	IPostRequest,
	IRequestState,
	RequesService
} from "@src/services"

interface IUseRequestState {
	get: { action: (props: IGetRequest) => Promise<void>; state: IRequestState }
	post: { action: (props: IPostRequest) => Promise<void>; state: IRequestState }
	patch: {
		action: (props: IPatchRequest) => Promise<void>
		state: IRequestState
	}
	delete: {
		action: (props: IDeleteRequest) => Promise<void>
		state: IRequestState
	}
}

const initialState: IRequestState = {
	loading: false,
	data: undefined,
	status: ERequestStatus.PENDING
}

export const useRequest = (): IUseRequestState => {
	const [getState, setGetState] = useState<IRequestState>(initialState)
	const [postState, setPostState] = useState<IRequestState>(initialState)
	const [patchState, setPatchState] = useState<IRequestState>(initialState)
	const [deleteState, setDeleteState] = useState<IRequestState>(initialState)

	const get = async ({ url, headers, params }: IGetRequest) => {
		try {
			setGetState({ ...initialState, loading: true })
			const data = await RequesService.get({ url, headers, params })
			const status = ERequestStatus.SUCCESS
			setGetState({ ...initialState, data, status })
		} catch (error) {
			const status = ERequestStatus.ERROR
			setGetState({ ...initialState, status })
			// eslint-disable-next-line no-console
			console.error("useRequest [get]", error)
		}
	}

	const post = async ({ url, headers, body }: IPostRequest) => {
		try {
			setPostState({ ...initialState, loading: true })
			const data = await RequesService.post({ url, headers, body })
			const status = ERequestStatus.SUCCESS
			setPostState({ ...initialState, data, status })
		} catch (error) {
			const status = ERequestStatus.ERROR
			setPostState({ ...initialState, status })
			// eslint-disable-next-line no-console
			console.error("useRequest [post]", error)
		}
	}

	const patch = async ({ url, headers, body }: IPatchRequest) => {
		try {
			setPatchState({ ...initialState, loading: true })
			const data = await RequesService.patch({ url, headers, body })
			const status = ERequestStatus.SUCCESS
			setPatchState({ ...initialState, data, status })
		} catch (error) {
			const status = ERequestStatus.ERROR
			setPatchState({ ...initialState, status })
			// eslint-disable-next-line no-console
			console.error("useRequest [patch]", error)
		}
	}

	const _delete = async ({ url, headers }: IDeleteRequest) => {
		try {
			setDeleteState({ ...initialState, loading: true })
			const data = await RequesService.delete({ url, headers })
			const status = ERequestStatus.SUCCESS
			setDeleteState({ ...initialState, data, status })
		} catch (error) {
			const status = ERequestStatus.ERROR
			setDeleteState({ ...initialState, status })
			// eslint-disable-next-line no-console
			console.error("useRequest [delete]", error)
		}
	}

	return {
		get: { action: get, state: getState },
		post: { action: post, state: postState },
		patch: { action: patch, state: patchState },
		delete: { action: _delete, state: deleteState }
	}
}
