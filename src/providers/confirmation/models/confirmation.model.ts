export enum EMolConfirmationType {
	SUCESS = "success",
	WARNING = "warning",
	ERROR = "error",
	INFO = "info"
}

export interface IConfirmationProps {
	type: EMolConfirmationType
	question: string
	onAccept: (accept: boolean) => void
}

export interface IConfirmationContextValue {
	setConfirmation: (props: IConfirmationProps) => void
	setOpen: (open: boolean) => void
}
