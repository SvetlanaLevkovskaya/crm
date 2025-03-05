import { FetchTableDataDto } from '../Table.types'

export type UpdateTableRowDto = Omit<FetchTableDataDto, 'id' | 'total' | 'child'>
