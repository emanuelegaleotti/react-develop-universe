import {Link} from 'react-router'

import './header.scss'

type HeaderProps = {
    menuOpen: boolean
    onToggleMenu: () => void
}

export default function Header({menuOpen, onToggleMenu}: HeaderProps) {
    return (
        <header id="ks-header">
            <button id="ks-mobile-menu"
                    type="button"
                    aria-label="Menu"
                    aria-expanded={menuOpen}
                    onClick={onToggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
            </button>
            <Link id="ks-logo" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23 23 20.46" aria-hidden="true">
                    <circle r="2.05" fill="currentColor"/>
                    <g stroke="currentColor" fill="none">
                        <ellipse rx="11" ry="4.2"/>
                        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                </svg>
                <span>react-develop-universe</span>
            </Link>
        </header>
    )
}
