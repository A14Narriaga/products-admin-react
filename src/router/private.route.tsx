import { Navigate, useLocation } from "react-router-dom"

import { EAuthStatus, EStorage } from "@src/models"
import { useAuthContext } from "@src/modules"
import { Storage } from "@src/utilities"

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
	const { pathname, search } = useLocation()
	const { authState } = useAuthContext()
	const { authStatus } = authState
	if (authStatus === EAuthStatus.AUTHENTICATED) return element
	const lastPath = `${pathname}${search}`
	Storage.setLocal(EStorage.LAST_PATH, lastPath)
	return (
		<Navigate
			to="/login"
			replace
		/>
	)
}
