interface PageRangeComponentProps {
	currentPage: number
	numOfItems: number
	numOfItemsPerPage: number
}

export const PageRangeComponent = ({
	currentPage,
	numOfItems,
	numOfItemsPerPage
}: PageRangeComponentProps) => {
	const pageInfo = () => {
		const start = (currentPage - 1) * numOfItemsPerPage + 1
		const end = currentPage * numOfItemsPerPage
		const range = `${start} - ${end}`
		return (
			<>
				Showing <b>{range}</b> of <b>{numOfItems}</b>
			</>
		)
	}
	return (
		<section className="flex justify-end">
			<div className="text-sm font-normal">{pageInfo()}</div>
		</section>
	)
}
