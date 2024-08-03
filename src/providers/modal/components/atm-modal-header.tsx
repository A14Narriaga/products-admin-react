interface AtmModalHeaderProps {
	label: string
}

export const AtmModalHeader = ({ label }: AtmModalHeaderProps) => {
	return (
		<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
				{label}
			</h3>
		</div>
	)
}
