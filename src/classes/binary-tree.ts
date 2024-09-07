import { CNode } from "./node"

export class BinaryTree {
	#root: CNode
	constructor(data: unknown) {
		this.#root = new CNode(data)
	}

	add(): void {
		const newNode = new CNode("")
		// eslint-disable-next-line no-console
		console.log(newNode, this.#root)
	}
}
