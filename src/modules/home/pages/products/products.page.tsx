import { ProductList } from "./components"
import { ProductsProvider } from "./context"

export const ProductsPage = () => {
	return (
		<ProductsProvider>
			<section className="max-w-screen-lg px-4 py-5 mx-auto ">
				<ProductList />
			</section>
		</ProductsProvider>
	)
}
