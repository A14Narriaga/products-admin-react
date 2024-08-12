import { ReactElement } from "react"

import { AtmIcon, EIconType } from "./atm-icon"

interface IAtmButtonProps {
	className?: string
	label?: string | ReactElement
	disabled?: boolean
	iconType?: EIconType
	iconName?: string
	onlyText?: boolean
	type?: "button" | "submit" | "reset"
	variant?: "primary" | "secondary" | "alternative" | "danger"
	onClick?: () => void
}

const getStylesByVariant = (variant: string, onlyText: boolean) => {
	switch (variant) {
		case "primary": {
			return onlyText
				? "font-medium text-blue-600 dark:text-blue-500 hover:underline"
				: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
		}
		case "secondary": {
			return "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
		}
		case "alternative": {
			return "text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
		}
		case "danger": {
			return onlyText
				? "font-medium text-red-600 dark:text-red-500 hover:underline"
				: "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
		}
	}
}

export const AtmButton = ({
	className,
	label,
	disabled = false,
	iconType = EIconType.SVG,
	iconName,
	type = "button",
	variant = "primary",
	onlyText = false,
	onClick
}: IAtmButtonProps) => {
	return (
		<button
			className={`${className} ${getStylesByVariant(variant, onlyText)} ${label ? (onlyText ? "" : "px-5 py-2.5 me-2 mb-2") : "p-2.5"}`}
			type={type}
			onClick={onClick}
			disabled={disabled}>
			<div className="flex gap-1 items-center justify-center">
				<AtmIcon
					iconType={iconType}
					iconName={iconName}
				/>
				{label && <>{label}</>}
			</div>
		</button>
	)
}
