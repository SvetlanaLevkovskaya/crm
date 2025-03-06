import { useEffect, useState } from 'react'
import { customToastError } from '../ui/CustomToast'
import { fetchTableData } from './Table.service'
import { FetchTableDataDto } from './Table.types'

export const useTableData = () => {
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

    return { tableData, setTableData, loading, error }
}
