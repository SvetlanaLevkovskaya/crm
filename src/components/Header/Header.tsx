import clsx from 'clsx'
import { ArrowBackIcon, HeaderIcon } from '../ui/Icons'
import './Header.style.scss'

const NAV_ITEMS = [
    { href: '/', label: 'На главную', icon: <HeaderIcon /> },
    { href: '/back', label: 'Назад', icon: <ArrowBackIcon /> },
    { href: '/view', label: 'Просмотр', isActive: true },
    { href: '/manage', label: 'Управление' },
]

export const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    {NAV_ITEMS.map(({ href, label, icon, isActive }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className={clsx('nav-link', {
                                    'icon-link': icon,
                                    active: isActive,
                                })}
                                aria-label={icon ? label : undefined}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {icon || label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
