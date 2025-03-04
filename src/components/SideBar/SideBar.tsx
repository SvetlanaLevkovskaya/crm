import { ArrowDownIcon, SidebarIcon } from '../ui/Icons'
import './SideBar.style.scss'

const MENU_ITEMS = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  'СМР',
  'График',
  'МиМ',
  'Рабочие',
  'Капложения',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты',
]

export const SideBar = () => {
  return (
    <aside className="sidebar">
      <button className="dropdown-button" aria-expanded="true">
        <div className="button-content">
          <span>Название проекта </span>
          <span>Аббривиатура</span>
        </div>
        <ArrowDownIcon className="arrow-icon" />
      </button>
      <ul className="dropdown-menu">
        {MENU_ITEMS.map((item) => (
          <li key={item} className={item === 'СМР' ? 'active' : ''}>
            <SidebarIcon /> {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}
