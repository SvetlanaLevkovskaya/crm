import {
    ChangeEvent,
    CSSProperties,
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { LevelIcon, TrashIcon } from '../../ui/Icons'
import { FetchTableDataDto } from '../Table.types'
import { createTableRow, deleteTableRow } from './TableRow.service'
import './TableRow.style.scss'
import { findParentId, formatCurrency, removeRowById } from './TableRow.utils'
import { useUpdateRowHook } from './useUpdateRow.hook'

interface Props {
    id: number | null
    levelDepth: number
    rowName: string
    salary: number
    equipmentCosts: number
    overheads: number
    estimatedProfit: number
    setTableData: Dispatch<SetStateAction<FetchTableDataDto[]>>
    tableData: FetchTableDataDto[]
    editingRowId: number | null
    setEditingRowId: Dispatch<SetStateAction<number | null>>
}

export const TableRow = ({
    id,
    levelDepth,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
    setTableData,
    tableData,
    editingRowId,
    setEditingRowId,
}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [formData, setFormData] = useState<FetchTableDataDto>({
        id: editingRowId,
        rowName,
        salary,
        equipmentCosts,
        overheads,
        estimatedProfit,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        total: 0,
        child: [],
    })

    const updateRow = useUpdateRowHook(id, formData, setTableData)

    const parentId = useMemo(() => findParentId(tableData, editingRowId), [tableData, editingRowId])

    const handleDoubleClick = () => {
        setEditingRowId(id)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const formattedValue = value
            .replace(/[^0-9.,]/g, '')
            .replace(',', '.')
            .replace(/(\..*?)\..*/g, '$1')

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'rowName' ? value : formattedValue,
        }))
    }

    const createRow = (parentId: number | null) => {
        const newRow = {
            id: null,
            parentId,
            rowName: '',
            salary: 0,
            equipmentCosts: 0,
            overheads: 0,
            estimatedProfit: 0,
            mimExploitation: 0,
            machineOperatorSalary: 0,
            materials: 0,
            mainCosts: 0,
            supportCosts: 0,
            total: 0,
            child: [],
        }

        setTableData((prevData) => {
            const updatedData = [...prevData]

            const addRowToParent = (
                rows: FetchTableDataDto[],
                parentId: number | null
            ): FetchTableDataDto[] => {
                return rows.map((row) => {
                    if (row.id === parentId) {
                        return {
                            ...row,
                            child: Array.isArray(row.child) ? [...row.child, newRow] : [newRow],
                        }
                    }
                    if (row.child?.length > 0) {
                        return {
                            ...row,
                            child: addRowToParent(row.child, parentId),
                        }
                    }
                    return row
                })
            }

            return addRowToParent(updatedData, parentId)
        })

        setEditingRowId(null)
    }

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            try {
                if (editingRowId !== null) {
                    await updateRow()
                } else {
                    const newRow = await createTableRow(formData, parentId)

                    setTableData((prevData) => {
                        const replaceTempId = (rows: FetchTableDataDto[]): FetchTableDataDto[] => {
                            return rows.map((row) => {
                                if (row.id === editingRowId) return { ...newRow }
                                if (row.child?.length)
                                    return { ...row, child: replaceTempId(row.child) }
                                return row
                            })
                        }
                        return replaceTempId(prevData)
                    })
                }
                setEditingRowId(null)
            } catch (error) {
                console.error('Ошибка при сохранении строки', error)
            }
        }
    }

    const deleteRow = async () => {
        try {
            await deleteTableRow(id)
            setTableData((prevData) => removeRowById(prevData, id))
        } catch (error) {
            console.error('Ошибка при удалении строки', error)
        }
    }

    const renderCell = (name: keyof typeof formData, value: string | number) => (
        <td onDoubleClick={handleDoubleClick} className={editingRowId === id ? 'editing' : ''}>
            {editingRowId === id ? (
                <input
                    ref={name === 'rowName' ? inputRef : undefined}
                    name={name}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            ) : name !== 'rowName' ? (
                formatCurrency(Number(value))
            ) : (
                value || ''
            )}
        </td>
    )

    useEffect(() => {
        if (editingRowId === id && inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd =
                inputRef.current.value.length
            inputRef.current.focus()
        }
    }, [editingRowId, id])

    return (
        <tr>
            <td
                className="level-cell"
                data-depth={levelDepth}
                style={
                    {
                        '--depth': levelDepth,
                        paddingLeft: `${levelDepth * 20}px`,
                    } as CSSProperties
                }
            >
                <div className="level-icon-wrapper">
                    <div className="icon-container">
                        <LevelIcon className="level-icon" onClick={() => createRow(id)} />
                        <div className="trash-icon-wrapper" onClick={deleteRow}>
                            <TrashIcon />
                        </div>
                    </div>
                </div>
            </td>
            {renderCell('rowName', formData.rowName)}
            {renderCell('salary', formData.salary)}
            {renderCell('equipmentCosts', formData.equipmentCosts)}
            {renderCell('overheads', formData.overheads)}
            {renderCell('estimatedProfit', formData.estimatedProfit)}
        </tr>
    )
}
