import { useAuthContext } from "@src/modules/auth"

export const DashboardPage = () => {
	const { authState } = useAuthContext()
	const { user } = authState

	return (
		<section className="max-w-screen-lg px-4 py-5 mx-auto ">
			<b className="text-xl">Welcome {user?.name}</b>
		</section>
	)
}
