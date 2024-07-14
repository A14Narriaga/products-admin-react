import { IProduct } from "@src/models"

interface ProductItemProps {
	product: IProduct
	onDelete: (remove: boolean) => void
	onEdit: (edit: boolean) => void
}

export const ProductItem = ({
	product,
	onDelete,
	onEdit
}: ProductItemProps) => {
	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{product.name}
			</th>
			<td className="px-6 py-4">${product.price}</td>
			<td className="px-6 py-4">{product.stock}</td>
			<td className="px-6 py-4">
				<button
					className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
					onClick={() => onEdit(true)}>
					Edit
				</button>
			</td>
			<td className="px-6 py-4">
				<button
					className="font-medium text-red-600 dark:text-red-500 hover:underline"
					onClick={() => onDelete(true)}>
					Delete
				</button>
			</td>
		</tr>
	)
}
