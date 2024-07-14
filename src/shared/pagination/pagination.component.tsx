import { PageRangeComponent, PaginateComponent } from "./components"

interface PaginationComponentProps {
	numOfItems: number
	currentPage: number
	numOfItemsPerPage: number
	onCurrentPage: (page: number) => void
}

export const PaginationComponent = ({
	numOfItems,
	currentPage,
	numOfItemsPerPage,
	onCurrentPage
}: PaginationComponentProps) => {
	return (
		<nav className="py-2 flex flex-col gap-2">
			<section className="flex justify-end">
				<PageRangeComponent
					currentPage={currentPage}
					numOfItems={numOfItems}
					numOfItemsPerPage={numOfItemsPerPage}
				/>
			</section>
			<section className="flex justify-center">
				<PaginateComponent
					currentPage={currentPage}
					numOfItems={numOfItems}
					numOfItemsPerPage={numOfItemsPerPage}
					onCurrentPage={onCurrentPage}
				/>
			</section>
		</nav>
	)
}
