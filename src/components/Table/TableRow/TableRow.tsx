import {
    ChangeEvent,
    KeyboardEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react'
import { LevelIcon } from '../../ui/Icons'
import { FetchTableDataDto } from '../Table.types'
import { formatCurrency } from './formatCurrency'
import { useUpdateRow } from './useUpdateRow'

interface Props {
    id: number
    levelDepth: number
    rowName: string
    salary: number
    equipmentCosts: number
    overheads: number
    estimatedProfit: number
    setTableData: Dispatch<SetStateAction<FetchTableDataDto[]>>
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
}: Props) => {
    const [editingField, setEditingField] = useState<{
        rowId: number | null
        field: string | null
    }>({
        rowId: null,
        field: null,
    })

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [formData, setFormData] = useState({
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
    })

    const updateRow = useUpdateRow(id, formData, setTableData)

    const handleDoubleClick = (field: string) => {
        if (editingField.rowId !== id || editingField.field !== field) {
            setEditingField({ rowId: id, field })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === 'rowName') {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
            return
        }

        let formattedValue = value
            .replace(/[^0-9.,]/g, '')
            .replace(',', '.')
            .replace(/(\..*?)\..*/g, '$1')

        setFormData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }))
    }

    const handleBlurOrEnter = async () => {
        setEditingField({ rowId: null, field: null })
        await updateRow()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleBlurOrEnter()
    }

    useEffect(() => {
        if (editingField.rowId === id && editingField.field && inputRef.current) {
            const inputElement = inputRef.current
            inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length
            inputElement.focus()
        }
    }, [editingField, id])

    const renderCell = (name: keyof typeof formData, value: string | number) => (
        <td
            onDoubleClick={() => handleDoubleClick(name)}
            className={editingField.rowId === id && editingField.field === name ? 'editing' : ''}
        >
            {editingField.rowId === id && editingField.field === name ? (
                <input
                    ref={inputRef}
                    name={name}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleKeyDown}
                />
            ) : name !== 'rowName' ? (
                formatCurrency(Number(value))
            ) : (
                value
            )}
        </td>
    )

    return (
        <tr>
            <td
                className="level-cell"
                data-depth={levelDepth}
                style={{ paddingLeft: `${levelDepth * 20}px` }}
            >
                <div className="level-icon-wrapper">
                    <LevelIcon className="level-icon" />
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
