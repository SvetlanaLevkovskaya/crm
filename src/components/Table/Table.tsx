import { Fragment, useEffect, useState } from 'react'
import { customToastError } from '../ui/CustomToast'
import { Spinner } from '../ui/Spinner'
import { TABLE_HEADERS } from './Table.conctants'
import { fetchTableData } from './Table.service'
import './Table.style.scss'
import { FetchTableDataDto } from './Table.types'
import { TableRow } from './TableRow'

export const Table = () => {
    const [tableData, setTableData] = useState<FetchTableDataDto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTableData()
                setTableData(data)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    customToastError(`${error}`)
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <Spinner />
    if (error) return null

    const renderRows = (data: FetchTableDataDto[], levelDepth = 0) => {
        return data.map((row) => (
            <Fragment key={row.id}>
                <TableRow
                    levelDepth={levelDepth}
                    rowName={row.rowName}
                    salary={row.salary}
                    equipmentCosts={row.equipmentCosts}
                    overheads={row.overheads}
                    estimatedProfit={row.estimatedProfit}
                    id={row.id}
                    setTableData={setTableData}
                    tableData={tableData}
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
