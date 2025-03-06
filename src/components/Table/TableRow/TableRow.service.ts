import { handleApiError, instanceAxios } from '../../../services'
import { EID } from '../Table.conctants'
import { FetchTableDataDto } from '../Table.types'
import { UpdateTableRowDto } from './TableRow.types'

export const createTableRow = async (formData: FetchTableDataDto, parentId: number | null) => {
    try {
        const response = await instanceAxios.post(`/v1/outlay-rows/entity/${EID}/row/create`, {
            ...formData,
            parentId,
        })
        return response.data.current
    } catch (error) {
        throw new Error(handleApiError(error))
    }
}

export const updateTableRow = async (id: number | null, formData: UpdateTableRowDto) => {
    try {
        await instanceAxios.post(`/v1/outlay-rows/entity/${EID}/row/${id}/update`, {
            ...formData,
            salary: parseFloat(String(formData.salary)) || 0,
            equipmentCosts: parseFloat(String(formData.equipmentCosts)) || 0,
            overheads: parseFloat(String(formData.overheads)) || 0,
            estimatedProfit: parseFloat(String(formData.estimatedProfit)) || 0,
            mimExploitation: 0,
            machineOperatorSalary: 0,
            materials: 0,
            mainCosts: 0,
            supportCosts: 0,
        })
    } catch (error) {
        throw new Error(handleApiError(error))
    }
}

export const deleteTableRow = async (id: number | null) => {
    try {
        await instanceAxios.delete(`/v1/outlay-rows/entity/${EID}/row/${id}/delete`)
    } catch (error) {
        throw new Error(handleApiError(error))
    }
}
