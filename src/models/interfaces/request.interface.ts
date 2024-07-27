export interface IHeaders {
	[string: string]: string
}

export interface IQueryParams {
	[string: string]: string
}

export interface IGetRequest {
	url: string
	queryParams?: IQueryParams
	headers: IHeaders
}

export enum ERequestStatus {
	PENDING = "pending",
	SUCCESS = "success",
	ERROR = "error"
}
