import { useState } from "react";
import useContact from "./store/useContact";

export interface IUser {
	id?: number;
	fullname: string;
	pnumber: string;
}

const App = () => {
	const [contact, setContact] = useState<IUser>({
		fullname: "",
		pnumber: ""
	});
	const [isEditing, setisEditing] = useState<number | null>(null);

	const contacts = useContact(state => state.contacts);
	const postUser = useContact(state => state.postUser);
	const removeUser = useContact(state => state.removeUser);
	const updateUser = useContact(state => state.updateUser);

	function editUser(c: IUser) {
		setContact(c);
		setisEditing(c.id!);
	}

	function addUser() {
		if (!contact.fullname.trim() || !contact.pnumber.trim()) return;

		if (isEditing === null) {
			const obj = {
				...contact,
				id: Date.now()
			};
			postUser(obj);
		} else {
			const obj = {
				...contact,
				id: isEditing
			};
			updateUser(isEditing, obj);
		}

		setContact({ fullname: "", pnumber: "" });
		setisEditing(null);
	}

	return (
		<div>
			<form className='w-25 mx-auto border rounded p-3 mt-4'>
				<h1 className='text-center mb-4 text-secondary'>Contact CRUD</h1>
				<input
					value={contact.fullname}
					onChange={e => setContact({ ...contact, fullname: e.target.value })}
					className='form-control mb-3'
					placeholder='fullname...'
					type='text'
				/>
				<input
					value={contact.pnumber}
					onChange={e => setContact({ ...contact, pnumber: e.target.value })}
					className='form-control mb-3'
					placeholder='phone number'
					type='text'
				/>
				<button
					type='button'
					onClick={addUser}
					className='btn btn-primary w-100'
				>
					{isEditing !== null ? "update" : "add"}
				</button>
			</form>

			<table className='table table-hover w-50 mx-auto mt-4'>
				<thead>
					<tr>
						<th>id</th>
						<th>fullname</th>
						<th>number</th>
						<th>actions</th>
					</tr>
				</thead>
				<tbody>
					{contacts?.map(c => {
						return (
							<tr key={c.id}>
								<td>{c.id}</td>
								<td>{c.fullname}</td>
								<td>{c.pnumber}</td>
								<td>
									<button
										onClick={() => c.id && removeUser(c.id)}
										className='btn btn-danger mx-2'
									>
										delete
									</button>
									<button
										onClick={() => editUser(c)}
										className='btn btn-primary'
									>
										edit
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default App;
