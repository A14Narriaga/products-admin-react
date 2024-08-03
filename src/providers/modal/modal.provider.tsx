import { ReactNode, useState } from "react"

import { AtmModalBtnClose, AtmModalHeader } from "./components"
import { ModalContext } from "./context"
import { IModalContextValue, IModalProps } from "./models"

const initialState: IModalProps = {
	title: undefined,
	content: undefined,
	canClose: true
}

interface ModalProviderProps {
	children: ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [modalState, setModalState] = useState<IModalProps>(initialState)
	const [open, setOpen] = useState(false)
	const { title, content, canClose } = modalState

	const setModal = (modalProps: IModalProps) => {
		const props = { ...initialState, ...modalProps }
		setModalState(props)
	}

	const handleOpen = (open: boolean) => {
		setOpen(open)
	}

	const value: IModalContextValue = {
		setModal,
		setOpen: handleOpen
	}

	return (
		<ModalContext.Provider value={value}>
			{open && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
					<div className="relative p-4 w-full max-w-md max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							{canClose && (
								<AtmModalBtnClose onClose={() => handleOpen(false)} />
							)}
							{title && <AtmModalHeader label={title} />}
							{content}
						</div>
					</div>
				</div>
			)}
			{children}
		</ModalContext.Provider>
	)
}
