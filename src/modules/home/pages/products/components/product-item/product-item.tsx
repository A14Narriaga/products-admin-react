import { IProduct } from "@src/models"

interface ProductItemProps {
	product: IProduct
}

export const ProductItem = ({ product }: ProductItemProps) => {
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
				<a
					href="#"
					className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
					Edit
				</a>
			</td>
			<td className="px-6 py-4">
				<a
					href="#"
					className="font-medium text-red-600 dark:text-red-500 hover:underline">
					Delete
				</a>
			</td>
		</tr>
	)
}
