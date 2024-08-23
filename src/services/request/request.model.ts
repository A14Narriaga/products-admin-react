export interface IHeaders {
	[string: string]: string
}

export interface IParams extends Record<string, string | number | boolean> {}

export interface IGetRequest {
	url: string
	params?: IParams
	headers: IHeaders
}

export interface IPostRequest {
	url: string
	headers: IHeaders
	body: unknown
}

export interface IPatchRequest {
	url: string
	headers: IHeaders
	body: unknown
}

export interface IDeleteRequest {
	url: string
	headers: IHeaders
}

export enum ERequestStatus {
	PENDING = "pending",
	SUCCESS = "success",
	ERROR = "error"
}

export interface IRequestActions {
	get: (props: IGetRequest) => void
	post: (props: IPostRequest) => void
	patch: (props: IPatchRequest) => void
	delete: (props: IDeleteRequest) => void
}

export interface IRequestState {
	loading: boolean
	data: unknown
	status: ERequestStatus
}
