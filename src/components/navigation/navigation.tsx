import './navigation.scss'

import { NavLink, useLocation } from 'react-router'
import { navGroups } from './nav-items.ts'

export function Navigation() {
    const { pathname } = useLocation()

    return (
        <nav className={'ks-navigation'} aria-label="Main navigation">
            {navGroups.map(group => (
                <details key={group.label}
                         name="ks-nav"
                         open={group.items.some(item => pathname === item.to || pathname.startsWith(`${item.to}/`))}>
                    <summary>{group.label}</summary>
                    <ul>
                        {group.items.map(item => (
                            <li key={item.to}>
                                <NavLink to={item.to}>{item.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </details>
            ))}
        </nav>
    )
}
