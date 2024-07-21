import { useState } from "react"

interface IHeaders {
	[string: string]: string
}

interface IRequestState {
	loading: boolean
	data: unknown
	success: boolean | undefined
}

interface IRequestActions {
	get: (url: string, headers: IHeaders) => void
}

interface IUseRequestState {
	requestState: IRequestState
	requestActions: IRequestActions
}

const initialState: IRequestState = {
	loading: false,
	data: undefined,
	success: undefined
}

export const useRequest = (): IUseRequestState => {
	const [requestState, setRequestState] = useState<IRequestState>(initialState)

	const get = async (url: string, headers: IHeaders) => {
		try {
			setRequestState({ ...requestState, loading: true })
			const response = await fetch(url, headers)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const responseJSON = await response.json()
			// eslint-disable-next-line no-console
			console.log(responseJSON)
			// const { data } = responseJSON
			// setRequestState({ data, success: true, loading: false })
		} catch (error) {
			setRequestState({ data: undefined, success: false, loading: false })
			// eslint-disable-next-line no-console
			console.error("useRequest [get]", error)
		}
	}

	const requestActions = {
		get
	}

	return { requestState, requestActions }
}
