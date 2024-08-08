import { ReactElement } from "react"

export enum EAlertType {
	SUCESS = "success",
	WARNING = "warning",
	ERROR = "error",
	INFO = "info"
}

export interface IAlertProps {
	type: EAlertType
	label: ReactElement
}

export interface IAlertContextValue {
	show: (props: IAlertProps) => void
}
