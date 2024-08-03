import { AtmIcon, EIconType } from "./atm-icon"

interface IAtmButtonProps {
	className?: string
	label: string
	disabled?: boolean
	iconType?: EIconType
	iconName?: string
	type: "button" | "submit" | "reset"
	onClick?: () => void
}

export const AtmButton = ({
	className,
	label,
	disabled = false,
	iconType = EIconType.SVG,
	iconName,
	type = "button",
	onClick
}: IAtmButtonProps) => {
	return (
		<button
			className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${className}`}
			type={type}
			onClick={onClick}
			disabled={disabled}>
			<div className="flex gap-1 items-center">
				<AtmIcon
					iconType={iconType}
					iconName={iconName}
				/>
				<label>{label}</label>
			</div>
		</button>
	)
}
