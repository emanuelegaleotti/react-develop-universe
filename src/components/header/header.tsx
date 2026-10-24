
import {useNavigate} from 'react-router'


import './header.scss'
import User from "../user/user.tsx";
import {LogoutIcon, OpenOffcanvasRight} from "../../shared/icons.tsx";
import {useTranslation} from "react-i18next";

export default function Header() {
    const {t} = useTranslation()

    const navigate = useNavigate()
    const openReferencesOffcanvas = () => {
        // open references offcanvas
    }
    const openMenuOffcanvas = () => {
        // open menu offcanvas with aside-mobile children
    }

    const handleLogout = () => {

    }
    return (
        <header id="ks-header">
            <button id="ks-mobile-menu"
                    onClick={openMenuOffcanvas}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
            </button>
            <a id="ks-logo" onClick={() => {
                navigate('/')
            }}>
                <span>react-develop-universe</span>
            </a>
            <menu id="ks-user-menu">
                <User/>
                <span className={'separator'}></span>
                <button
                    id={'ks-logout'}
                    type="button"
                    onClick={handleLogout}
                    title={t('button.logout')}
                >
                    <LogoutIcon/>
                </button>
            </menu>
            <button id="ticket-assistant-reference"
                    onClick={openReferencesOffcanvas}>
                <OpenOffcanvasRight/>
            </button>
        </header>
    )
}
