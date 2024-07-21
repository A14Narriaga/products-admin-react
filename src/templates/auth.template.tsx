import { Outlet } from "react-router-dom"

import { AtmLogo } from "@src/components"

export const AuthTemplate = () => {
	return (
		<section className="h-screen w-screen flex justify-center items-center">
			<div className="w-96 p-10 bg-gray-900 rounded-md shadow-xl">
				<AtmLogo />
				<hr className="mt-5 pb-5" />
				<Outlet />
			</div>
		</section>
	)
}
