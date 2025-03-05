import { handleApiError, instanceAxios } from '../../../services'
import { UpdateTableRowDto } from './TableRow.types'

export const updateTableRow = async (id: number, formData: UpdateTableRowDto) => {
    try {
        await instanceAxios.post(`/v1/outlay-rows/entity/1/row/${id}/update`, {
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
