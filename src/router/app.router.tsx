import { createBrowserRouter, Navigate } from "react-router-dom"

import {
	Auth,
	DashboardPage,
	Home,
	LoginPage,
	ProductsPage
} from "@src/modules"

import { PrivateRoute } from "./private.route"
import { PublicRoute } from "./public.route"

const isProduction = import.meta.env.MODE === "production"
// eslint-disable-next-line no-console
console.log("APP_MODE =>", import.meta.env.MODE)

export const appRouter = createBrowserRouter(
	[
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
					element: <PrivateRoute element={<ProductsPage />} />
				}
			]
		},
		{
			path: "login",
			element: <PublicRoute element={<Auth />} />,
			children: [
				{
					path: "/login",
					element: <LoginPage />
				}
			]
		},
		{
			path: "*",
			element: (
				<Navigate
					to="/"
					replace
				/>
			)
		}
	],
	{
		basename: isProduction ? "/products-admin-react" : ""
	}
)
