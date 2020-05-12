export default class Persons {
	constructor(state = []) {
		this.state = state;
	}

	get() {
		return this.state;
	}

	indexOf(person, bool) {
		let index = this.state.findIndex(entry => {
			return bool ? Math.abs(entry.id) - 1 === person.id : Math.abs(entry.id) === person.id;
		});
		return index;
	}

	has(person, bool = false) {
		return this.indexOf(person, bool) > -1;
	}

	update(person, bool) {
		const state = this.state.map(entry => {
			if (bool) {
				return Math.abs(entry.id) - 1 === person.id
					? person
					: entry;
			} else {
				return Math.abs(entry.id) === person.id
					? person
					: entry;
			}
		});
		return new Persons(state);
	}

	add(person) {
		return new Persons([...this.state, person]);
	}

	upsert(person, bool = true) {
		return this.has(person, bool)
			? this.update(person, true)
			: this.add(person);
	}
}