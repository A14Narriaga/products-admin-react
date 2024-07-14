import { ReactNode, useReducer } from "react"

import { EAuthStatus, IUser } from "@src/models"
import { Storage } from "@src/utilities"

import { AuthContext, AuthState } from "./auth.context"
import { AuthAction, authReducer } from "./auth.reducer"

interface IAuthProvider {
	children: ReactNode
}

const initialState: AuthState = {
	authStatus: EAuthStatus.UNAUTHENTICATED,
	user: undefined
}

const init = (): AuthState => {
	const user = Storage.getLocal("user") as IUser
	if (!user) return initialState
	return {
		authStatus: EAuthStatus.AUTHENTICATED,
		user
	}
}

export const AuthProvider = ({ children }: IAuthProvider) => {
	const [authState, dispatch] = useReducer(authReducer, {}, init)

	const login = (email: string, password: string) => {
		// eslint-disable-next-line no-console
		console.log(email, password)
		const user: IUser = {
			_id: "123456",
			email,
			name: "John Doe",
			lastName: "Doe",
			isActive: true,
			roles: ["admin"]
		}
		const action: AuthAction = {
			type: EAuthStatus.AUTHENTICATED,
			payload: { user }
		}
		Storage.setLocal("user", user)
		dispatch(action)
	}

	const logout = () => {
		const action: AuthAction = {
			type: EAuthStatus.UNAUTHENTICATED,
			payload: undefined
		}
		Storage.removeLocal("user")
		dispatch(action)
	}

	const authActions = {
		login,
		logout
	}

	return (
		<AuthContext.Provider value={{ authState, authActions }}>
			{children}
		</AuthContext.Provider>
	)
}
