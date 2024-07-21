import { v4 as uuidv4 } from "uuid"

interface IColumn {
	headerName: string
	fields: string
}

interface IAtmTable<T> {
	columns: IColumn[]
	rows: T[]
	onRow: (row: T) => void
}

const AtmTable = <T,>({ columns, rows, onRow }: IAtmTable<T>) => {
	return (
		<table>
			<thead>
				<tr>
					{columns.map(({ headerName }) => (
						<th key={uuidv4()}>{headerName}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr key={uuidv4()}>
						{columns.map(({ fields }) => (
							<td
								key={uuidv4()}
								onClick={() => onRow(row)}>
								{fields
									.split(" ")
									.map((field) => `${String(row[field as keyof T])} `)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default AtmTable
