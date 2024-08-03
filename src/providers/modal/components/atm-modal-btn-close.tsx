import { AtmIcon, EIconType } from "@src/components"

interface AtmModalBtnCloseProps {
	onClose: () => void
}

export const AtmModalBtnClose = ({ onClose }: AtmModalBtnCloseProps) => {
	return (
		<button
			type="button"
			className="absolute top-3.5 right-3.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
			onClick={onClose}>
			<AtmIcon
				iconType={EIconType.SVG}
				iconName="x-mark"
			/>
			<span className="sr-only">Close modal</span>
		</button>
	)
}
