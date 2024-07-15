import { createContext } from "react"

import { EAuthStatus, IUser } from "@src/models"

export interface AuthState {
	authStatus: EAuthStatus
	user?: IUser
}

interface AuthActions {
	login: (email: string, password: string) => Promise<void>
	logout: () => void
}

export interface AuthContextType {
	authState: AuthState
	authActions: AuthActions
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
