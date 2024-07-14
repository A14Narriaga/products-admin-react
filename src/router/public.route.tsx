import { Navigate } from "react-router-dom"

import { EAuthStatus } from "@src/models"
import { useAuthContext } from "@src/modules"

export const PublicRoute = ({ element }: { element: JSX.Element }) => {
	const { authState } = useAuthContext()
	const { authStatus } = authState
	if (authStatus === EAuthStatus.UNAUTHENTICATED) return element
	return (
		<Navigate
			to="/"
			replace
		/>
	)
}
