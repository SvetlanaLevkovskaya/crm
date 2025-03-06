import { TableRowDto } from '../Table.types'

export type UpdateTableRowDto = Omit<TableRowDto, 'id' | 'total' | 'child'>
