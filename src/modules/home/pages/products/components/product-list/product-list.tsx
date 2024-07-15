import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { IProduct, ProductProps } from "@src/models"
import { useAuthContext } from "@src/modules/auth"
import { ConfirmationComponent, PaginationComponent } from "@src/shared"
import { ITEMS_PER_PAGE } from "@src/utilities"

import { useProductsContext } from "../../context"
import { ProductFormComponent } from "../product-form"
import { ProductItem } from "../product-item"

export const ProductList = () => {
	const { authState } = useAuthContext()
	const { user } = authState
	const isStorer = user?.roles.includes("storer")
	const { productsState, productsActions } = useProductsContext()
	const { products, total } = productsState
	const { remove, edit, add, set } = productsActions
	const [currentPage, setCurrentPage] = useState(1)
	const [openDeleteConfir, setOpenDeleteConfir] = useState(false)
	const [openEditModal, setOpenEditModal] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const [currenteProduct, setCurrenteProduct] = useState<IProduct | undefined>()

	const handleOpenEditModal = (open: boolean, product: IProduct) => {
		setCurrenteProduct(product)
		setOpenEditModal(open)
	}

	const handleOpenDeleteConfir = (open: boolean, product: IProduct) => {
		setCurrenteProduct(product)
		setOpenDeleteConfir(open)
	}

	const setPage = async (page: number) => {
		await set(page)
		setCurrentPage(page)
	}

	const handleDeleteProd = async (accept: boolean) => {
		setOpenDeleteConfir(false)
		if (!accept || !currenteProduct) return
		const { _id } = currenteProduct
		await remove(_id)
	}

	const handleEditProd = async (product: IProduct) => {
		setOpenEditModal(false)
		if (!currenteProduct) return
		const { _id } = currenteProduct
		await edit(_id, product)
	}

	const handleAddProd = async (product: IProduct) => {
		setOpenAddModal(false)
		await add(product)
	}

	return (
		<>
			{openAddModal && (
				<ProductFormComponent
					product={undefined}
					onClose={() => setOpenAddModal(false)}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onProduct={(newProduct) => handleAddProd(newProduct)}
				/>
			)}
			{openEditModal && (
				<ProductFormComponent
					product={currenteProduct}
					onClose={() => setOpenEditModal(false)}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onProduct={(newProduct) => handleEditProd(newProduct)}
				/>
			)}
			{openDeleteConfir && (
				<ConfirmationComponent
					question="Are you sure you want to delete this product?"
					onClose={() => setOpenDeleteConfir(false)}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onAccept={handleDeleteProd}
				/>
			)}
			{isStorer && (
				<div className="flex justify-end">
					<button
						type="button"
						className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						onClick={() => setOpenAddModal(true)}>
						Add product
					</button>
				</div>
			)}
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
						{isStorer && (
							<th
								scope="col"
								className="px-6 py-3">
								<span className="sr-only">Delete</span>
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{products.map((product: IProduct) => (
						<ProductItem
							key={product._id}
							product={product}
							onDelete={(remove) => handleOpenDeleteConfir(remove, product)}
							onEdit={(edit) => handleOpenEditModal(edit, product)}
						/>
					))}
				</tbody>
			</table>
			<PaginationComponent
				numOfItems={total}
				currentPage={currentPage}
				numOfItemsPerPage={ITEMS_PER_PAGE}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onCurrentPage={setPage}
			/>
		</>
	)
}
