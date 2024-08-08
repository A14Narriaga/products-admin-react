import { Outlet } from "react-router-dom"

import { MolNavbar } from "@src/components"

export const DashboardTemplate = () => {
	return (
		<>
			<MolNavbar />
			<Outlet />
		</>
	)
}
