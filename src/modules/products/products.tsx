import { useState } from "react"

import { AtmButton } from "@src/components"
import { useProducts } from "@src/hooks"
import { EConfirmationType, useConfirmation, useModal } from "@src/providers"

import { useAuthContext } from "../auth"
import { ProductsForm, ProductsList, ProductsPagination } from "./components"
import { INewProduct, IProduct } from "./models"

export const Products = () => {
	const { setModal, setOpen: setOpenModal } = useModal()
	const { setConfirmation, setOpen: setOpenConfirmation } = useConfirmation()

	const { productsState, productsActions } = useProducts()
	const { products, total } = productsState
	const { remove, edit, add, set } = productsActions

	const { authState } = useAuthContext()
	const { user } = authState
	const userRoles = user?.roles || []

	const [currentPage, setCurrentPage] = useState(1)

	const handleEditProd = async ({ _id }: IProduct, newProduct: INewProduct) => {
		await edit.action(_id, newProduct)
		setOpenModal(false)
	}

	const handleAddProd = async (product: INewProduct) => {
		await add.action(product)
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
		if (accept) {
			await remove.action(_id)
			await setPage(currentPage)
			setOpenConfirmation(false)
		} else {
			setOpenConfirmation(false)
		}
	}

	const handleConfirmation = (product: IProduct) => {
		setConfirmation({
			type: EConfirmationType.INFO,
			question: "Are you sure you want to delete this product?",
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onAccept: (accept) => handleDeleteProd(accept, product)
		})
		setOpenConfirmation(true)
	}

	const setPage = async (page: number) => {
		await set.action(page)
		setCurrentPage(page)
	}

	const hasAccess = (columnRoles: string[]): boolean => {
		if (columnRoles.length === 0) return true
		return columnRoles.some((role) => userRoles.includes(role))
	}

	return (
		<section className="max-w-screen-lg px-4 py-5 mx-auto">
			{hasAccess(["storer"]) && (
				<div className="flex justify-end">
					<AtmButton
						type="button"
						variant="secondary"
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
		</section>
	)
}
