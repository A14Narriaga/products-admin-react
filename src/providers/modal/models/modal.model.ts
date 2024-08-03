import { ReactNode } from "react"

export interface IModalProps {
	title?: string
	canClose?: boolean
	content: ReactNode
}

export interface IModalContextValue {
	setModal: (props: IModalProps) => void
	setOpen: (open: boolean) => void
}
