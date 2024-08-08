import { useNavigate } from "react-router-dom"

import { EStorage } from "@src/models"
import { EAlertType, useAlert } from "@src/providers"
import { Storage } from "@src/utilities"

import { FormLogin, ILoginForm } from "./components"
import { useAuthContext } from "./context"

export const Login = () => {
	const navegate = useNavigate()
	const { show } = useAlert()
	const { authActions } = useAuthContext()

	const onLogin = async (values: ILoginForm) => {
		const lastPath = Storage.getLocal(EStorage.LAST_PATH, "/") as string
		const { email, password } = values
		try {
			await authActions.login(email, password)
			show({ type: EAlertType.SUCESS, label: <>Login Success</> })
			navegate(lastPath, { replace: true })
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log("LOGIN ERROR:", error)
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	return <FormLogin onLogin={onLogin} />
}
