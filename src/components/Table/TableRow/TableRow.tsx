import { LevelIcon } from '../../ui/Icons'
import './TableRow.style.scss'

interface Props {
  levelDepth: number
  rowName: string
  salary: number
  equipmentCosts: number
  overheads: number
  estimatedProfit: number
}

export const TableRow = ({
  levelDepth,
  rowName,
  salary,
  equipmentCosts,
  overheads,
  estimatedProfit,
}: Props) => {
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
      <td>{rowName}</td>
      <td>{salary}</td>
      <td>{equipmentCosts}</td>
      <td>{overheads}</td>
      <td>{estimatedProfit}</td>
    </tr>
  )
}
