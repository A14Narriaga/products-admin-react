import { useNavigate } from "react-router-dom"

import { useAuthContext } from "../../context"

export const LoginPage = () => {
	const navegate = useNavigate()
	const { authActions } = useAuthContext()

	const login = () => {
		authActions.login("alan@gmail.com", "alanchito")
		navegate("/")
	}

	return (
		<button
			type="button"
			className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			onClick={login}>
			Login
		</button>
	)
}
