import { useState } from "react";
const Loops = () => {

	const people = [
		{ name: "Alice", age: 17 },
		{ name: "Bob", age: 21 },
		{ name: "Charlie", age: 16 },
		{ name: "Diana", age: 25 },
		{ name: "Eve", age: 30 },
	];

	const [value, setValue] = useState("");
	const filtered = people.filter((person) => person.name.toLowerCase().includes(value.toLowerCase()))

	return <>
		<div>
			<input type="text" placeholder="search" value={value} onChange={(e) => setValue(e.target.value)} />
		</div>
		<div>
			{filtered.length > 0 ? (filtered.map((persons, index) => (
				<p key={index}>{persons.name}</p>
			))) : (<p>No results found</p>)}
		</div>
	</>

}

export default Loops