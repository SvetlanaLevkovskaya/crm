import { ArrowBackIcon, HeaderIcon } from '../ui/Icons'
import './Header.style.scss'

export const Header = () => {
  return (
    <nav className="header">
      <HeaderIcon />
      <ArrowBackIcon />
      <a href="#" className="nav-link active">
        Просмотр
      </a>
      <a href="#" className="nav-link">
        Управление
      </a>
    </nav>
  )
}
