import { createBrowserRouter, Navigate } from "react-router-dom"

import { Auth, DashboardPage, Home, LoginPage, ProductsPage } from "./modules"

export const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				path: "/",
				element: <DashboardPage />
			},
			{
				path: "products",
				element: <ProductsPage />
			}
		]
	},
	{
		path: "login",
		element: <Auth />,
		children: [
			{
				path: "/login",
				element: <LoginPage />
			}
		]
	},
	{
		path: "*",
		element: <Navigate to="/" />
	}
])
