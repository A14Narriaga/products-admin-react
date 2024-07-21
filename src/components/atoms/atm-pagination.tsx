import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface IAtmPaginationProps {
	numOfItems: number
	numOfItemsPerPage: number
	currentPage: number
	onCurrentPage: (page: number) => void
}

export const AtmPagination = ({
	numOfItems,
	numOfItemsPerPage,
	currentPage,
	onCurrentPage
}: IAtmPaginationProps) => {
	const [pages, setPages] = useState<number[]>([])
	const [numOfPages, setNumOfPages] = useState<number>(0)

	useEffect(() => {
		const newPages = []
		const numOfPages = Math.ceil(numOfItems / numOfItemsPerPage)
		const start = currentPage
		const end = numOfPages
		for (let index = start; index < end + 1; index++) {
			newPages.push(index)
		}
		setNumOfPages(numOfPages)
		setPages(newPages)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numOfItems, numOfItemsPerPage])

	const handleCurrentPage = (page: number) => onCurrentPage(page)

	const handlePreviosPage = () => {
		if (currentPage === 1) return
		handleCurrentPage(currentPage - 1)
	}

	const handleNextPage = () => {
		if (currentPage === numOfPages) return
		handleCurrentPage(currentPage + 1)
	}

	return (
		<div className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
			<div
				className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
				onClick={handlePreviosPage}>
				Previous
			</div>
			{pages.map((page) => (
				<div
					key={uuidv4()}
					className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer ${currentPage === page ? "dark:bg-gray-700 dark:text-white " : "dark:bg-gray-800 dark:text-gray-400"}`}
					onClick={() => handleCurrentPage(page)}>
					{page}
				</div>
			))}
			<div
				className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
				onClick={handleNextPage}>
				Next
			</div>
		</div>
	)
}
