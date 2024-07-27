import React from "react"
import { v4 as uuidv4 } from "uuid"

import { useAuthContext } from "@src/modules"

interface IColumn {
	headerName: string
	fields: string
	visible: boolean
	roles: string[]
}

interface IAtmTable<T> {
	columns: IColumn[]
	rows: T[]
	onRow: (row: T) => void
}

export const AtmTable = <T,>({ columns, rows, onRow }: IAtmTable<T>) => {
	const { authState } = useAuthContext()
	const { user } = authState
	const userRoles = user?.roles || []

	const hasAccess = (columnRoles: string[]): boolean => {
		if (columnRoles.length === 0) return true
		return columnRoles.some((role) => userRoles.includes(role))
	}

	return (
		<table className="w-full text-sm text-left rtl:text-right overflow-hidden shadow-md rounded-lg text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					{columns.map(
						({ headerName, visible, roles }) =>
							hasAccess(roles) && (
								<th
									key={uuidv4()}
									scope="col"
									className="px-6 py-3">
									<span className={`${visible ? "" : "sr-only"}`}>
										{headerName}
									</span>
								</th>
							)
					)}
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr
						key={uuidv4()}
						className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
						{columns.map(
							({ fields, roles }, colIndex) =>
								hasAccess(roles) && (
									<td
										key={uuidv4()}
										className={`px-6 py-4 ${colIndex === 0 ? "font-medium text-white" : ""}`}
										onClick={() => onRow(row)}>
										{fields.split(" ").map((field) => {
											const cellData = row[field as keyof T]
											if (
												typeof cellData === "string" ||
												typeof cellData === "number" ||
												React.isValidElement(cellData)
											) {
												return (
													<React.Fragment key={uuidv4()}>
														{cellData}
													</React.Fragment>
												)
											}
											return <></>
										})}
									</td>
								)
						)}
					</tr>
				))}
			</tbody>
		</table>
	)
}
