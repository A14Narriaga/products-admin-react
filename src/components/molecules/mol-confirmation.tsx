import { AtmIcon, EIconType } from "../atoms"

// eslint-disable-next-line react-refresh/only-export-components
export enum EMolConfirmationType {
	SUCESS = "success",
	WARNING = "warning",
	ERROR = "error",
	INFO = "info"
}

interface IMolConfirmation {
	type: EMolConfirmationType
	question: string
	onAccept: (accept: boolean) => void
	onClose: () => void
}

const getIconName = (type: EMolConfirmationType) => {
	switch (type) {
		case EMolConfirmationType.SUCESS: {
			return ""
		}
		case EMolConfirmationType.WARNING: {
			return ""
		}
		case EMolConfirmationType.ERROR: {
			return ""
		}
		case EMolConfirmationType.INFO: {
			return "info"
		}
	}
}

export const MolConfirmation = ({
	type,
	question,
	onAccept,
	onClose
}: IMolConfirmation) => {
	const handleAccept = (accept: boolean) => {
		onAccept(accept)
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<button
						type="button"
						className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						onClick={onClose}>
						<AtmIcon
							iconType={EIconType.SVG}
							iconName="x-mark"
						/>
						<span className="sr-only">Close modal</span>
					</button>
					<div className="p-4 md:p-5 text-center">
						<AtmIcon
							iconType={EIconType.SVG}
							iconName={getIconName(type)}
						/>
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							{question}
						</h3>
						<button
							type="button"
							className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
							onClick={() => handleAccept(true)}>
							Yes, I'm sure
						</button>
						<button
							type="button"
							className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
							onClick={() => handleAccept(false)}>
							No, cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
