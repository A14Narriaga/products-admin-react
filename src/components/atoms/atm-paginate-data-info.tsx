interface IAtmPaginateDataInfoProps {
	currentPage: number
	numOfItems: number
	numOfItemsPerPage: number
}
export const AtmPaginateDataInfo = ({
	currentPage,
	numOfItems,
	numOfItemsPerPage
}: IAtmPaginateDataInfoProps) => {
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
	return <div className="text-sm font-normal">{pageInfo()}</div>
}
