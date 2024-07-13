import { Outlet } from "react-router-dom"

import { Navbar } from "@src/shared"

export const Home = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}
