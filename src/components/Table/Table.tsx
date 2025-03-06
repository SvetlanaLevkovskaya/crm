import { Fragment, useState } from 'react'
import { Spinner } from '../ui/Spinner'
import { TABLE_HEADERS } from './Table.conctants'
import './Table.style.scss'
import { TableRowDto } from './Table.types'
import { TableRow } from './TableRow'
import { useTableData } from './useTableData.hook'

export const Table = () => {
    const { tableData, setTableData, loading, error } = useTableData()
    const [editingRowId, setEditingRowId] = useState<number | null>(null)

    if (loading) return <Spinner />
    if (error) return null

    const renderRows = (data: TableRowDto[], levelDepth = 0) => {
        return data.map((row) => (
            <Fragment key={row.id}>
                <TableRow
                    {...row}
                    levelDepth={levelDepth}
                    tableData={tableData}
                    setTableData={setTableData}
                    editingRowId={editingRowId}
                    setEditingRowId={setEditingRowId}
                />
                {row.child &&
                    row.child.length > 0 &&
                    levelDepth < 3 &&
                    renderRows(row.child, levelDepth + 1)}
            </Fragment>
        ))
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {TABLE_HEADERS.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{renderRows(tableData)}</tbody>
            </table>
        </div>
    )
}
