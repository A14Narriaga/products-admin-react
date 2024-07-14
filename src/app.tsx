import { RouterProvider } from "react-router-dom"

import { AuthProvider } from "./modules"
import { appRouter } from "./router"

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={appRouter} />
		</AuthProvider>
	)
}

export default App
