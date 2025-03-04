import { handleApiError, instanceAxios } from '../../services/instanceAxios'
import { FetchTableDataDto } from './Table.types'

export const fetchTableData = async (): Promise<FetchTableDataDto[]> => {
  try {
    const response = await instanceAxios.get<FetchTableDataDto[]>(
      '/v1/outlay-rows/entity/1/row/list'
    )
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}
