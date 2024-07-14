import { ReactNode, useReducer } from "react"

import { EAuthStatus, EStorage, IUser } from "@src/models"
import { Storage } from "@src/utilities"

import { AuthContext, AuthState } from "./auth.context"
import { AuthAction, authReducer } from "./auth.reducer"
import { AuthService } from "./auth.service"

interface IAuthProvider {
	children: ReactNode
}

const initialState: AuthState = {
	authStatus: EAuthStatus.UNAUTHENTICATED,
	user: undefined
}

const init = (): AuthState => {
	const user = Storage.getLocal(EStorage.USER) as IUser
	if (!user) return initialState
	return {
		authStatus: EAuthStatus.AUTHENTICATED,
		user
	}
}

export const AuthProvider = ({ children }: IAuthProvider) => {
	const [authState, dispatch] = useReducer(authReducer, {}, init)

	const login = async (email: string, password: string) => {
		const user = (await AuthService.login(email, password)) as IUser
		const action: AuthAction = {
			type: EAuthStatus.AUTHENTICATED,
			payload: { user }
		}
		Storage.setLocal(EStorage.USER, user)
		dispatch(action)
	}

	const logout = () => {
		const action: AuthAction = {
			type: EAuthStatus.UNAUTHENTICATED,
			payload: undefined
		}
		Storage.removeLocal(EStorage.USER)
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
