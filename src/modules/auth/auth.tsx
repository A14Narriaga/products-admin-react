import { Outlet } from "react-router-dom"

import { Logo } from "@src/shared"

export const Auth = () => {
	return (
		<section className="h-screen w-screen flex justify-center items-center">
			<div className="w-96 p-10 bg-gray-900 rounded-md shadow-xl">
				<Logo />
				<hr className="mt-5 pb-5" />
				<Outlet />
			</div>
		</section>
	)
}
