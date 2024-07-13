import { NavLink } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const navegation = [
	{ to: "/", label: "Home" },
	{ to: "/products", label: "Products" }
]

const handleSelectedNavLink = (isActive: boolean): string => {
	const color = isActive ? "text-white" : "text-gray-400"
	return `${color} hover:underline`
}

export const SubmenuComponent = () => {
	return (
		<nav className="bg-gray-50 dark:bg-gray-700">
			<div className="max-w-screen-xl px-4 py-3 mx-auto">
				<div className="flex items-center">
					<div className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
						{navegation.map(({ to, label }) => (
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
