import { AtmTable, SkeletonTable } from "@src/components"

import { IProduct } from "../models"

const columns = [
	{ headerName: "name", fields: "name", visible: true, roles: [] },
	{ headerName: "price", fields: "price", visible: true, roles: [] },
	{ headerName: "stock", fields: "stock", visible: true, roles: [] },
	{ headerName: "edit", fields: "edit", visible: false, roles: [] },
	{ headerName: "delete", fields: "delete", visible: false, roles: ["storer"] }
]

interface IProductsListProps {
	products: IProduct[]
	onEdit: (product: IProduct) => void
	onDelete: (product: IProduct) => void
}

export const ProductsList = ({
	products,
	onEdit,
	onDelete
}: IProductsListProps) => {
	const getRows = (products: IProduct[]) => {
		return products.map((product) => ({
			...product,
			edit: (
				<button
					className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
					onClick={() => onEdit(product)}>
					Edit
				</button>
			),
			delete: (
				<button
					className="font-medium text-red-600 dark:text-red-500 hover:underline"
					onClick={() => onDelete(product)}>
					Delete
				</button>
			)
		}))
	}

	if (!products) return <SkeletonTable />
	if (products.length === 0) return <p>No hay productos para mostrar</p>
	return (
		<AtmTable
			columns={columns}
			rows={getRows(products)}
			onRow={() => {}}
		/>
	)
}
