import { ErrorMessage, Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

import { EStorage } from "@src/models"
import { Storage } from "@src/utilities"

import { useAuthContext } from "../../context"

export const LoginPage = () => {
	const navegate = useNavigate()
	const { authActions } = useAuthContext()

	const initialValues = {
		email: "employee@gmail.com",
		password: "Employee12345"
	}

	const validationSchema = Yup.object({
		email: Yup.string().required("Required"),
		password: Yup.string().required("Required")
	})

	const handleSubmit = async (values: typeof initialValues) => {
		const lastPath = Storage.getLocal(EStorage.LAST_PATH, "/") as string
		const { email, password } = values
		try {
			await authActions.login(email, password)
			navegate(lastPath, { replace: true })
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log("LOGIN ERROR:", error)
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
			<Form className="py-4 flex flex-col gap-5">
				<div>
					<Field
						type="email"
						name="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="email"
						required
					/>
					<ErrorMessage
						name="email"
						component="div"
						className="text-red-500 text-sm"
					/>
				</div>
				<div>
					<Field
						type="password"
						name="password"
						id="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="password"
						required
					/>
					<ErrorMessage
						name="password"
						component="div"
						className="text-red-500 text-sm"
					/>
				</div>
				<button
					type="submit"
					className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Login
				</button>
			</Form>
		</Formik>
	)
}
