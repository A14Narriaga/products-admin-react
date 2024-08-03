import { RouterProvider } from "react-router-dom"

import { AuthProvider } from "./modules"
import { ConfirmationProvider, ModalProvider } from "./providers"
import { appRouter } from "./router"

function App() {
	return (
		<AuthProvider>
			<ModalProvider>
				<ConfirmationProvider>
					<RouterProvider router={appRouter} />
				</ConfirmationProvider>
			</ModalProvider>
		</AuthProvider>
	)
}

export default App
