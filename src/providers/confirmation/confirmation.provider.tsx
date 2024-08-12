import { ReactNode, useState } from "react"

import { AtmIcon, EIconType } from "@src/components"

import { AtmButton } from "../../components/atoms/atm-button"
import { AtmModalBtnClose } from "../modal/components"
import { ConfirmationContext } from "./context"
import {
	EConfirmationType,
	IConfirmationContextValue,
	IConfirmationProps
} from "./models"

const getIconName = (type: EConfirmationType) => {
	switch (type) {
		case EConfirmationType.SUCESS: {
			return ""
		}
		case EConfirmationType.WARNING: {
			return ""
		}
		case EConfirmationType.ERROR: {
			return ""
		}
		case EConfirmationType.INFO: {
			return "info"
		}
	}
}

const initialState: IConfirmationProps = {
	type: EConfirmationType.INFO,
	question: "",
	onAccept: () => {}
}

interface ConfirmationProviderProps {
	children: ReactNode
}

export const ConfirmationProvider = ({
	children
}: ConfirmationProviderProps) => {
	const [confirmationState, setConfirmationState] =
		useState<IConfirmationProps>(initialState)
	const [open, setOpen] = useState(false)
	const { question, type, onAccept } = confirmationState

	const setConfirmation = (confirmationProps: IConfirmationProps) => {
		const props = { ...initialState, ...confirmationProps }
		setConfirmationState(props)
	}

	const handleOpen = (open: boolean) => {
		setOpen(open)
	}

	const value: IConfirmationContextValue = {
		setConfirmation,
		setOpen: handleOpen
	}

	return (
		<ConfirmationContext.Provider value={value}>
			{open && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
					<div className="relative p-4 w-full max-w-md max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<AtmModalBtnClose onClose={() => handleOpen(false)} />
							<div className="p-4 md:p-5 text-center">
								<AtmIcon
									iconType={EIconType.SVG}
									iconName={getIconName(type)}
								/>
								<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
									{question}
								</h3>
								<AtmButton
									label="Yes, I'm sure"
									variant="danger"
									onClick={() => onAccept(true)}
								/>
								<AtmButton
									label="No, cancel"
									variant="alternative"
									onClick={() => onAccept(false)}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			{children}
		</ConfirmationContext.Provider>
	)
}
