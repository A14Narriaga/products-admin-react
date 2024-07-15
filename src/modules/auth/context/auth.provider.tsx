import { ReactNode, useEffect, useReducer } from "react"

import { EAuthStatus, EStorage, ILoginResponse } from "@src/models"
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

export const AuthProvider = ({ children }: IAuthProvider) => {
	const [authState, dispatch] = useReducer(authReducer, initialState)

	useEffect(() => {
		void getUser()
	}, [])

	const getUser = async () => {
		const tokenLocal = Storage.getLocal(EStorage.TOKEN) as string
		if (!tokenLocal) return
		const response = (await AuthService.getUser(tokenLocal)) as ILoginResponse
		const { token, ...user } = response
		const action: AuthAction = {
			type: EAuthStatus.AUTHENTICATED,
			payload: { user }
		}
		Storage.setLocal(EStorage.TOKEN, token)
		dispatch(action)
	}

	const login = async (email: string, password: string) => {
		const response = (await AuthService.login(
			email,
			password
		)) as ILoginResponse
		const { token, ...user } = response
		const action: AuthAction = {
			type: EAuthStatus.AUTHENTICATED,
			payload: { user }
		}
		Storage.setLocal(EStorage.TOKEN, token)
		dispatch(action)
	}

	const logout = () => {
		const action: AuthAction = {
			type: EAuthStatus.UNAUTHENTICATED,
			payload: undefined
		}
		Storage.removeLocal(EStorage.TOKEN)
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
