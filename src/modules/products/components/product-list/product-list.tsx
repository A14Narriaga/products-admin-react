import { useState } from "react"

import {
	AtmPaginateDataInfo,
	AtmPagination,
	AtmTable,
	EMolConfirmationType,
	MolConfirmation
} from "@src/components"
import { useAuthContext } from "@src/modules/auth"
import { ITEMS_PER_PAGE } from "@src/utilities"

import { useProductsContext } from "../../hooks"
import { INewProduct, IProduct } from "../../models"
import { ProductFormComponent } from "../product-form"

const columns = [
	{ headerName: "name", fields: "name", visible: true, roles: [] },
	{ headerName: "price", fields: "price", visible: true, roles: [] },
	{ headerName: "stock", fields: "stock", visible: true, roles: [] },
	{ headerName: "edit", fields: "edit", visible: false, roles: [] },
	{ headerName: "delete", fields: "delete", visible: false, roles: ["storer"] }
]

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
		await setPage(currentPage)
	}

	const handleEditProd = async (product: INewProduct) => {
		setOpenEditModal(false)
		if (!currenteProduct) return
		const { _id } = currenteProduct
		await edit(_id, product)
	}

	const handleAddProd = async (product: INewProduct) => {
		setOpenAddModal(false)
		await add(product)
		await setPage(1)
	}

	const getRows = () => {
		return products.map((product) => ({
			...product,
			edit: (
				<button
					className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
					onClick={() => handleOpenEditModal(true, product)}>
					Edit
				</button>
			),
			delete: (
				<button
					className="font-medium text-red-600 dark:text-red-500 hover:underline"
					onClick={() => handleOpenDeleteConfir(true, product)}>
					Delete
				</button>
			)
		}))
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
				<MolConfirmation
					type={EMolConfirmationType.INFO}
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
			<AtmTable
				columns={columns}
				rows={getRows()}
				onRow={() => {}}
			/>
			<nav className="py-2 flex flex-col gap-2">
				<section className="flex justify-end">
					<AtmPaginateDataInfo
						currentPage={currentPage}
						numOfItems={total}
						numOfItemsPerPage={ITEMS_PER_PAGE}
					/>
				</section>
				<section className="flex justify-center">
					<AtmPagination
						currentPage={currentPage}
						numOfItems={total}
						numOfItemsPerPage={ITEMS_PER_PAGE}
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onCurrentPage={setPage}
					/>
				</section>
			</nav>
		</>
	)
}
