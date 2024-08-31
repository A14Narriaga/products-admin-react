import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { AtmButton, AtmLogo } from "@src/components"
import { EAuthStatus } from "@src/models"
import { useAuthContext } from "@src/modules"

enum EThemeTypes {
	DARK = "dark",
	LIGHT = "light"
}

export const MenuComponent = () => {
	const navegate = useNavigate()
	const [theme, setTheme] = useState<EThemeTypes>(EThemeTypes.DARK)
	const { authState, authActions } = useAuthContext()
	const { authStatus } = authState
	const { logout } = authActions

	const handleClickLogin = () => navegate("/login")

	const handleClickLogout = () => {
		logout()
		navegate("/")
	}

	const handleClickTheme = (theme: EThemeTypes) => {
		document.documentElement.dataset.theme = theme
		setTheme(theme)
	}

	return (
		<nav className="bg-colorHeader border-gray-200">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg p-4">
				<AtmLogo />
				<section className="flex items-center gap-5">
					<AtmButton
						onlyText={true}
						label={theme}
						onClick={() =>
							handleClickTheme(
								theme === EThemeTypes.DARK
									? EThemeTypes.LIGHT
									: EThemeTypes.DARK
							)
						}
					/>
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
				</section>
			</div>
		</nav>
	)
}
