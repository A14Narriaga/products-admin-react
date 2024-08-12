import { useNavigate } from "react-router-dom"

import { AtmButton, AtmLogo } from "@src/components"
import { EAuthStatus } from "@src/models"
import { useAuthContext } from "@src/modules"

export const MenuComponent = () => {
	const navegate = useNavigate()
	const { authState, authActions } = useAuthContext()
	const { authStatus } = authState
	const { logout } = authActions

	const handleClickLogin = () => navegate("/login")
	const handleClickLogout = () => {
		logout()
		navegate("/")
	}

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg p-4">
				<AtmLogo />
				{authStatus === EAuthStatus.AUTHENTICATED ? (
					<AtmButton
						onlyText={true}
						label="Logout"
						onClick={handleClickLogout}
					/>
				) : (
					<AtmButton
						onlyText={true}
						label="Login"
						onClick={handleClickLogin}
					/>
				)}
			</div>
		</nav>
	)
}
