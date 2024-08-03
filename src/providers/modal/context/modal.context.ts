import { createContext } from "react"

import { IModalContextValue } from "../models"

export const ModalContext = createContext<IModalContextValue | undefined>(
	undefined
)
