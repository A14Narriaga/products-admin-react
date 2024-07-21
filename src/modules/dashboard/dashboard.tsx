import { useAuthContext } from "../auth"

export const DashboardPage = () => {
	const { authState } = useAuthContext()
	const { user } = authState

	return (
		<section className="max-w-screen-lg px-4 py-5 mx-auto ">
			<b className="text-xl">Welcome {user?.name}</b>
			<p className="text-base">{user?.roles[0]}</p>
		</section>
	)
}
