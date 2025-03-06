import { handleApiError, instanceAxios } from '../../services'
import { EID } from './Table.conctants'
import { TableRowDto } from './Table.types'

export const fetchTableData = async (): Promise<TableRowDto[]> => {
    try {
        const response = await instanceAxios.get<TableRowDto[]>(
            `/v1/outlay-rows/entity/${EID}/row/list`
        )
        return response.data
    } catch (error) {
        throw new Error(handleApiError(error))
    }
}
