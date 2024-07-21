import { ChangeEvent, FocusEvent } from "react"

interface IAtmInputProps {
	type: string
	label?: string
	placeholder: string
	name: string
	value: string
	error: string
	toched: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onBlur: (e: FocusEvent<HTMLInputElement>) => void
}

export const AtmInput = ({
	label,
	type = "text",
	name,
	placeholder = "",
	value,
	error,
	toched,
	onChange,
	onBlur
}: IAtmInputProps) => {
	return (
		<div>
			{label && <label>{label}</label>}
			<input
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{toched && error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	)
}
