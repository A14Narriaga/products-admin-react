import { createContext } from "react"

import { IAlertContextValue } from "../models"

export const AlertContext = createContext<IAlertContextValue | undefined>(
	undefined
)
