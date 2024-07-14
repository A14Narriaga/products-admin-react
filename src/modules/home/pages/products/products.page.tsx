import { v4 as uuidv4 } from "uuid"

import { IProduct } from "@src/models"

import { ProductList } from "./components"

const products: IProduct[] = [
	{
		_id: uuidv4(),
		name: "Product 1",
		price: 10.99,
		stock: 50
	}
]

export const ProductsPage = () => {
	return (
		<section className="max-w-screen-xl px-4 py-5 mx-auto ">
			<ProductList products={products} />
		</section>
	)
}
