import { Subject } from "rxjs"

export class CSubjectManager {
	#subject$ = new Subject()

	getSubject = () => this.#subject$.asObservable()
	setSubject = (value: unknown) => this.#subject$.next(value)
}
