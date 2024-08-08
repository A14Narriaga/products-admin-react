import { RouterProvider } from "react-router-dom"

import { AuthProvider } from "./modules"
import { AlertProvider, ConfirmationProvider, ModalProvider } from "./providers"
import { appRouter } from "./router"

function App() {
	return (
		<AuthProvider>
			<ModalProvider>
				<AlertProvider>
					<ConfirmationProvider>
						<RouterProvider router={appRouter} />
					</ConfirmationProvider>
				</AlertProvider>
			</ModalProvider>
		</AuthProvider>
	)
}

export default App
