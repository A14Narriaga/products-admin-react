import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { AtmModal } from "@src/components"
import { useAuthContext } from "@src/modules/auth"

import { INewProduct, IProduct } from "../../models"

interface ProductFormComponentProps {
	product: undefined | IProduct
	onClose: () => void
	onProduct: (product: INewProduct) => void
}

export const ProductFormComponent = ({
	product,
	onClose,
	onProduct
}: ProductFormComponentProps) => {
	const { authState } = useAuthContext()
	const { user } = authState
	const isStorer = user?.roles.includes("storer")
	const isEditPage = product !== undefined

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
		onProduct(newProduct)
		onClose()
	}

	return (
		<AtmModal
			title={`${isEditPage ? "Edit" : "Create New"} Product`}
			onClose={onClose}>
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
									isStorer === false
										? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400"
										: "bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								} text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rounded-lg transition duration-200`}
								placeholder="Type product name"
								required
								readOnly={!isStorer}
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
									isStorer === false
										? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400"
										: "bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								} text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rounded-lg transition duration-200`}
								placeholder="$2999"
								required
								readOnly={!isStorer}
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
						<button
							type="submit"
							className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							{/* <svg
											className="me-1 -ms-1 w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fill-rule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd"></path>
										</svg> */}
							{isEditPage ? "Save" : "Add new"} product
						</button>
					</div>
				</Form>
			</Formik>
		</AtmModal>
	)
}
