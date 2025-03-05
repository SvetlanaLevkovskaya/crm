import { useCallback } from 'react'
import { FetchTableDataDto } from '../Table.types'
import { updateTableRow } from './TableRow.service'
import { UpdateTableRowDto } from './TableRow.types'

export const useUpdateRow = (
    id: number,
    formData: UpdateTableRowDto,
    setTableData: (data: (prevTableData: FetchTableDataDto[]) => any) => void
) => {
    return useCallback(async () => {
        try {
            await updateTableRow(id, formData)
            setTableData((prevTableData) =>
                prevTableData.map((row) => (row.id === id ? { ...row, ...formData } : row))
            )
        } catch (error) {
            console.error('Ошибка обновления строки:', error)
        }
    }, [formData, id, setTableData])
}
