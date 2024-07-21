import { createBrowserRouter, Navigate } from "react-router-dom"

import { DashboardPage, Login, Products } from "@src/modules"
import { AuthTemplate, DashboardTemplate } from "@src/templates"

import { PrivateRoute } from "./private.route"
import { PublicRoute } from "./public.route"

const isProduction = import.meta.env.MODE === "production"
// eslint-disable-next-line no-console
console.log("APP_MODE =>", import.meta.env.MODE)

export const appRouter = createBrowserRouter(
	[
		{
			path: "/",
			element: <DashboardTemplate />,
			children: [
				{
					path: "/",
					element: <DashboardPage />
				},
				{
					path: "products",
					element: <PrivateRoute element={<Products />} />
				}
			]
		},
		{
			path: "login",
			element: <PublicRoute element={<AuthTemplate />} />,
			children: [
				{
					path: "/login",
					element: <Login />
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
