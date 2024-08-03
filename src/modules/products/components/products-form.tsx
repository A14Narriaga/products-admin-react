import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { AtmButton } from "@src/components"
import { useAuthContext } from "@src/modules/auth"

import { INewProduct, IProduct } from "../models"

interface ProductsFormComponentProps {
	product: undefined | IProduct
	onSave: (newProduct: INewProduct) => void
}

export const ProductsForm = ({
	product,
	onSave
}: ProductsFormComponentProps) => {
	const { authState } = useAuthContext()
	const { user } = authState
	const userRoles = user?.roles || []

	const isEditPage = product !== undefined

	const hasAccess = (columnRoles: string[]): boolean => {
		if (columnRoles.length === 0) return true
		return columnRoles.some((role) => userRoles.includes(role))
	}

	const access = hasAccess(["storer"])

	const initialValues = {
		name: product?.name || "",
		price: product?.price || 0,
		stock: product?.stock || 0
	}

	const validationSchema = Yup.object({
		name: Yup.string().required("Required"),
		price: Yup.number()
			.required("Required")
			.min(0, "Must be greater than or equal to 0"),
		stock: Yup.number()
			.required("Required")
			.min(0, "Must be greater than or equal to 0")
	})

	const handleSubmit = (values: typeof initialValues) => {
		const newProduct = { ...values } as INewProduct
		onSave(newProduct)
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
			<Form className="p-4 md:p-5">
				<div className="grid gap-4 mb-4 grid-cols-2">
					<div className="col-span-2">
						<label
							htmlFor="name"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Name
						</label>
						<Field
							type="text"
							name="name"
							id="name"
							className={`${
								access
									? "bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									: "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400"
							} text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rounded-lg transition duration-200`}
							placeholder="Type product name"
							required
							readOnly={!access}
						/>
						<ErrorMessage
							name="name"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label
							htmlFor="price"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Price
						</label>
						<Field
							type="number"
							name="price"
							id="price"
							className={`${
								access === false
									? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400"
									: "bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							} text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rounded-lg transition duration-200`}
							placeholder="$2999"
							required
							readOnly={!access}
						/>
						<ErrorMessage
							name="price"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label
							htmlFor="stock"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Stock
						</label>
						<Field
							type="number"
							name="stock"
							id="stock"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="10"
							required
						/>
						<ErrorMessage
							name="stock"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
				</div>
				<div className="flex justify-end">
					<AtmButton
						type="submit"
						label={`${isEditPage ? "Save" : "Add new"} product`}
						iconName={isEditPage ? "" : "plus"}
					/>
				</div>
			</Form>
		</Formik>
	)
}
