export const Storage = {
	removeLocal(key: string): void {
		localStorage.removeItem(key)
	},

	setLocal(key: string, value: unknown): unknown {
		localStorage.setItem(key, JSON.stringify(value))
		return value
	},

	getLocal(key: string, otherwise: unknown = undefined): unknown {
		const value = localStorage.getItem(key)
		try {
			return value ? JSON.parse(value) : otherwise
		} catch {
			return value ?? otherwise
		}
	},

	setSession(key: string, value: unknown): unknown {
		sessionStorage.setItem(key, JSON.stringify(value))
		return value
	},

	getSession(key: string, otherwise: unknown = undefined): unknown {
		const value = sessionStorage.getItem(key)
		try {
			return value ? JSON.parse(value) : otherwise
		} catch {
			return value ?? otherwise
		}
	},

	setSessionObj(
		key: string,
		init: unknown,
		prop: string,
		value: unknown
	): unknown {
		const storage = {
			...(this.getSession(key, init) as Record<string, unknown>)
		}
		storage[prop] = value
		this.setSession(key, storage)
		return storage[prop]
	},

	getSessionStorageObj(key: string, init: unknown, prop: string): unknown {
		const storage = this.getSession(key, init)
		return (storage as Record<string, unknown>)[prop]
	}
}
