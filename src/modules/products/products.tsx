import { useState } from "react"

import { AtmButton } from "@src/components"
import { useProducts } from "@src/hooks"
import { ERequestStatus } from "@src/models"
import { useConfirmation, useModal } from "@src/providers"
import { EMolConfirmationType } from "@src/providers/confirmation/models"

import { useAuthContext } from "../auth"
import { ProductsForm, ProductsList, ProductsPagination } from "./components"
import { INewProduct, IProduct } from "./models"

export const Products = () => {
	const { setModal, setOpen: setOpenModal } = useModal()
	const { setConfirmation, setOpen: setOpenConfirmation } = useConfirmation()

	const { requestState, productsState, productsActions } = useProducts()
	const { products, total } = productsState
	const { remove, edit, add, set } = productsActions
	const { status } = requestState

	const { authState } = useAuthContext()
	const { user } = authState
	const userRoles = user?.roles || []

	const [currentPage, setCurrentPage] = useState(1)

	const handleEditProd = async ({ _id }: IProduct, newProduct: INewProduct) => {
		await edit(_id, newProduct)
		setOpenModal(false)
	}

	const handleAddProd = async (product: INewProduct) => {
		await add(product)
		await setPage(1)
		setOpenModal(false)
	}

	const handleModal = (type: string, product?: IProduct) => {
		setModal({
			title: `${type === "edit" ? "Edit" : "Create New"} Product`,
			content: (
				<ProductsForm
					product={product}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSave={(newProduct) =>
						type === "edit"
							? handleEditProd(product!, newProduct)
							: handleAddProd(newProduct)
					}
				/>
			)
		})
		setOpenModal(true)
	}

	const handleDeleteProd = async (accept: boolean, { _id }: IProduct) => {
		if (!accept) return
		await remove(_id)
		await setPage(currentPage)
		setOpenConfirmation(false)
	}

	const handleConfirmation = (product: IProduct) => {
		setConfirmation({
			type: EMolConfirmationType.INFO,
			question: "Are you sure you want to delete this product?",
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onAccept: (accept) => handleDeleteProd(accept, product)
		})
		setOpenConfirmation(true)
	}

	const setPage = async (page: number) => {
		await set(page)
		setCurrentPage(page)
	}

	const hasAccess = (columnRoles: string[]): boolean => {
		if (columnRoles.length === 0) return true
		return columnRoles.some((role) => userRoles.includes(role))
	}

	return (
		<section className="max-w-screen-lg px-4 py-5 mx-auto ">
			{status === ERequestStatus.ERROR && <>Error al obtener la informacion</>}
			<>
				{hasAccess(["storer"]) && (
					<div className="flex justify-end">
						<AtmButton
							type="button"
							label="Add product"
							iconName="plus"
							onClick={() => handleModal("add")}
						/>
					</div>
				)}
				<ProductsList
					products={products}
					onDelete={(product) => handleConfirmation(product)}
					onEdit={(product) => handleModal("edit", product)}
				/>
				<ProductsPagination
					numOfItems={total}
					currentPage={currentPage}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onCurrentPage={setPage}
				/>
			</>
		</section>
	)
}
