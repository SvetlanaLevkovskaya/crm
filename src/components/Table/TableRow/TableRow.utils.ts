import { FetchTableDataDto } from '../Table.types'

export function findParentId(rows: FetchTableDataDto[], childId: number | null): number | null {
    if (!Array.isArray(rows)) return null

    for (const row of rows) {
        if (row.child?.some((child) => child.id === childId)) return row.id
        const nestedParentId = findParentId(row.child, childId)
        if (nestedParentId !== null) return nestedParentId
    }
    return null
}

export function removeRowById(
    rows: FetchTableDataDto[],
    idToRemove: number | null
): FetchTableDataDto[] {
    return rows
        .filter((row) => row.id !== idToRemove)
        .map((row) => ({
            ...row,
            child: Array.isArray(row.child) ? removeRowById(row.child, idToRemove) : row.child,
        }))
}
