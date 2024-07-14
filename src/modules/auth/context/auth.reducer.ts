import { EAuthStatus, IUser } from "@src/models"

import { AuthState } from "./auth.context"

export type AuthAction =
	| { type: EAuthStatus.AUTHENTICATED; payload: { user: IUser } }
	| { type: EAuthStatus.UNAUTHENTICATED; payload?: undefined }

export const authReducer = (
	state: AuthState,
	action: AuthAction
): AuthState => {
	const { type, payload } = action
	switch (type) {
		case EAuthStatus.AUTHENTICATED: {
			return {
				...state,
				authStatus: EAuthStatus.AUTHENTICATED,
				user: payload.user
			}
		}
		case EAuthStatus.UNAUTHENTICATED: {
			return {
				...state,
				authStatus: EAuthStatus.UNAUTHENTICATED,
				user: undefined
			}
		}
		default: {
			return state
		}
	}
}
