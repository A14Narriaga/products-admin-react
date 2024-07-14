import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { IProduct, ProductProps } from "@src/models"
import { PaginationComponent } from "@src/shared"

import { ProductItem } from "../product-item"

interface IProductProps {
	products: IProduct[]
}

const ITEMS_PER_PAGE = 10

export const ProductList = ({ products }: IProductProps) => {
	const [currentPage, setCurrentPage] = useState(1)

	const setPage = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<>
			<table className="w-full text-sm text-left rtl:text-right overflow-hidden shadow-md rounded-lg text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{ProductProps.map((prop: string) => (
							<th
								key={uuidv4()}
								scope="col"
								className="px-6 py-3">
								{prop}
							</th>
						))}
						<th
							scope="col"
							className="px-6 py-3">
							<span className="sr-only">Edit</span>
						</th>
						<th
							scope="col"
							className="px-6 py-3">
							<span className="sr-only">Delete</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product: IProduct) => (
						<ProductItem
							key={product._id}
							product={product}
						/>
					))}
				</tbody>
			</table>
			<PaginationComponent
				numOfItems={products.length}
				currentPage={currentPage}
				numOfItemsPerPage={ITEMS_PER_PAGE}
				onCurrentPage={setPage}
			/>
		</>
	)
}
