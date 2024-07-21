import { Form, Formik, FormikHelpers } from "formik"
import * as Yup from "yup"

import { AtmButton, AtmInput } from "@src/components"

export interface ILoginForm {
	email: string
	password: string
}

const initialValues: ILoginForm = {
	email: "storer@gmail.com",
	password: "Storer12345"
}

const validationSchema = Yup.object({
	email: Yup.string().required("Required"),
	password: Yup.string().required("Required")
})

interface FormLoginProps {
	onLogin: (loginForm: ILoginForm) => void
}

export const FormLogin = ({ onLogin }: FormLoginProps) => {
	const onSubmit = (
		values: ILoginForm,
		{ resetForm }: FormikHelpers<ILoginForm>
	) => {
		onLogin(values)
		resetForm()
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}>
			{({ handleChange, handleBlur, values, touched, errors }) => (
				<Form className="py-4 flex flex-col gap-5">
					<AtmInput
						type="email"
						name="email"
						placeholder="email"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						toched={!!touched.email}
						error={errors.email!}
					/>
					<AtmInput
						type="password"
						name="password"
						placeholder="password"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						toched={!!touched.password}
						error={errors.password!}
					/>
					<AtmButton
						type="submit"
						label="Login"
					/>
				</Form>
			)}
		</Formik>
	)
}
