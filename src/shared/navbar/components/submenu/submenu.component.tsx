import { NavLink } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import { EAuthStatus } from "@src/models"
import { useAuthContext } from "@src/modules"

const navegation = [
	{ to: "/", label: "Home", isPrivate: false },
	{ to: "/products", label: "Products", isPrivate: true }
]

const handleSelectedNavLink = (isActive: boolean): string => {
	const color = isActive ? "text-white" : "text-gray-400"
	return `${color} hover:underline`
}

export const SubmenuComponent = () => {
	const { authState } = useAuthContext()
	const { authStatus } = authState
	return (
		<nav className="bg-gray-50 dark:bg-gray-700">
			<div className="max-w-screen-lg px-4 py-3 mx-auto">
				<div className="flex items-center">
					<div className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
						{navegation
							.filter(({ isPrivate }) =>
								authStatus === EAuthStatus.AUTHENTICATED ? true : !isPrivate
							)
							.map(({ to, label }) => (
								<NavLink
									key={uuidv4()}
									className={({ isActive }) => handleSelectedNavLink(isActive)}
									to={to}>
									{label}
								</NavLink>
							))}
					</div>
				</div>
			</div>
		</nav>
	)
}
