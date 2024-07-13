import { Link } from "react-router-dom"

import { Logo } from "@src/shared/logo"

export const MenuComponent = () => {
	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
				<Logo />
				<div className="flex items-center space-x-6 rtl:space-x-reverse text-cyan-400">
					<Link to="/login">Login</Link>
				</div>
			</div>
		</nav>
	)
}
