export class CNode {
	#nextYes: undefined | CNode
	#nextNo: undefined | CNode
	#data: unknown

	constructor(data: unknown) {
		this.#nextYes = undefined
		this.#nextNo = undefined
		this.#data = data
	}

	get nextYes(): CNode | undefined {
		return this.#nextYes
	}

	get nextNo(): CNode | undefined {
		return this.#nextNo
	}

	get data(): unknown {
		return this.#data
	}

	set nextYes(nextYes: CNode | undefined) {
		this.#nextYes = nextYes
	}

	set nextNo(nextYes: CNode | undefined) {
		this.#nextYes = nextYes
	}

	set data(data: unknown) {
		this.#data = data
	}
}
