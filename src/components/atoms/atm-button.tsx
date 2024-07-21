import { AtmIcon, EIconType } from "./atm-icon"

interface IAtmButtonProps {
	className?: string
	label: string
	disabled?: boolean
	iconType?: EIconType
	iconName?: string
	type: "button" | "submit" | "reset"
	onclick?: () => void
}

export const AtmButton = ({
	className,
	label,
	disabled = false,
	iconType,
	iconName,
	type = "button",
	onclick
}: IAtmButtonProps) => {
	return (
		<button
			className={`text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
			type={type}
			onClick={onclick}
			disabled={disabled}>
			<div>
				<AtmIcon
					iconType={iconType}
					iconName={iconName}
				/>
				<label>{label}</label>
			</div>
		</button>
	)
}
