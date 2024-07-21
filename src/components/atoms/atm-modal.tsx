import { ReactNode } from "react"

import { AtmIcon, EIconType } from "./atm-icon"

interface IAtmModal {
	title: string
	children: ReactNode
	onClose: () => void
}

export const AtmModal = ({ title, children, onClose }: IAtmModal) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							{title}
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-toggle="crud-modal"
							onClick={onClose}>
							<AtmIcon
								iconType={EIconType.SVG}
								iconName="x-mark"
							/>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}
