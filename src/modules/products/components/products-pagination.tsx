import { AtmPaginateDataInfo, AtmPagination } from "@src/components"

const ITEMS_PER_PAGE = 10

interface IProductsPaginationProps {
	currentPage: number
	numOfItems: number
	onCurrentPage: (page: number) => void
}

export const ProductsPagination = ({
	currentPage,
	numOfItems,
	onCurrentPage
}: IProductsPaginationProps) => {
	return (
		<nav className="py-2 flex flex-col gap-2">
			<section className="flex justify-end">
				<AtmPaginateDataInfo
					currentPage={currentPage}
					numOfItems={numOfItems}
					numOfItemsPerPage={ITEMS_PER_PAGE}
				/>
			</section>
			<section className="flex justify-center">
				<AtmPagination
					currentPage={currentPage}
					numOfItems={numOfItems}
					numOfItemsPerPage={ITEMS_PER_PAGE}
					onCurrentPage={onCurrentPage}
				/>
			</section>
		</nav>
	)
}
