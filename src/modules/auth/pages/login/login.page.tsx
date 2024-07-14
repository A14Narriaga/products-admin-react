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
		email: "a14n.arriaga@gmail.com",
		password: "A14Narriaga"
	}

	const validationSchema = Yup.object({
		email: Yup.string().required("Required"),
		password: Yup.string().required("Required")
	})

	const handleSubmit = (values: typeof initialValues) => {
		const lastPath = Storage.getLocal(EStorage.LAST_PASS, "/") as string
		const { email, password } = values
		authActions.login(email, password)
		navegate(lastPath, { replace: true })
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
			<Form className="p-4 md:p-5">
				<div className="grid gap-4 mb-4 grid-cols-2">
					<div className="col-span-2">
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
					<div className="col-span-2 sm:col-span-1">
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
