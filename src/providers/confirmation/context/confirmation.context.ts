import { createContext } from "react"

import { IConfirmationContextValue } from "../models/confirmation.model"

export const ConfirmationContext = createContext<
	IConfirmationContextValue | undefined
>(undefined)
