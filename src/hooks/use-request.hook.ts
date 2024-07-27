import { useState } from "react"

import { ERequestStatus, IGetRequest } from "@src/models"
import { RequesService } from "@src/services"

interface IRequestState {
	loading: boolean
	data: unknown
	status: ERequestStatus
}

interface IRequestActions {
	get: (props: IGetRequest) => void
}

interface IUseRequestState {
	requestState: IRequestState
	requestActions: IRequestActions
}

const initialState: IRequestState = {
	loading: false,
	data: undefined,
	status: ERequestStatus.PENDING
}

export const useRequest = (): IUseRequestState => {
	const [requestState, setRequestState] = useState<IRequestState>(initialState)

	const get = async ({ url, headers }: IGetRequest) => {
		try {
			setRequestState({ ...initialState, loading: true })
			const data = await RequesService.get({ url, headers })
			setRequestState({
				...initialState,
				data,
				status: ERequestStatus.SUCCESS
			})
		} catch (error) {
			setRequestState({
				...initialState,
				status: ERequestStatus.ERROR
			})
			// eslint-disable-next-line no-console
			console.error("useRequest [get]", error)
		}
	}

	const requestActions = {
		get
	}

	return { requestState, requestActions }
}
