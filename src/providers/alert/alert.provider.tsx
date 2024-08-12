import { ReactNode, useEffect, useRef, useState } from "react"

import { AtmIcon, EIconType } from "@src/components"

import { AlertContext } from "./context"
import { EAlertType, IAlertContextValue, IAlertProps } from "./models"

const getIconName = (type: EAlertType) => {
	switch (type) {
		case EAlertType.SUCESS: {
			return "success"
		}
		case EAlertType.WARNING: {
			return "warning"
		}
		case EAlertType.ERROR: {
			return "error"
		}
		case EAlertType.INFO: {
			return "info"
		}
	}
}

const initialState: IAlertProps = {
	type: EAlertType.INFO,
	label: <>Prueba</>
}

interface AlertProviderProps {
	children: ReactNode
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const [alertState, setAlertState] = useState<IAlertProps>(initialState)
	const [open, setOpen] = useState(false)
	const { type, label } = alertState

	useEffect(() => {
		return () => {
			clearSetTimeout()
		}
	}, [])

	const clearSetTimeout = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
	}

	const show = (alertProps: IAlertProps) => {
		const props = { ...initialState, ...alertProps }
		setAlertState(props)
		setOpen(true)
		clearSetTimeout()
		timeoutRef.current = setTimeout(() => {
			setOpen(false)
		}, 4000)
	}

	const value: IAlertContextValue = {
		show
	}

	return (
		<AlertContext.Provider value={value}>
			{open && (
				<div className="fixed top-0 left-0 right-0 flex items-center p-4 m-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 z-50">
					<svg
						className="flex-shrink-0 w-4 h-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20">
						<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
					</svg>
					{getIconName(type)}
					<div className="ms-3 text-sm font-medium">{label}</div>
					<button
						type="button"
						className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
						data-dismiss-target="#alert-1"
						aria-label="Close"
						onClick={() => setOpen(false)}>
						<AtmIcon
							iconType={EIconType.SVG}
							iconName="x-mark"
						/>
					</button>
				</div>
			)}
			{children}
		</AlertContext.Provider>
	)
}
