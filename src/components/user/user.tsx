
import { useState} from 'react'


import './user.scss'
import {ChevronDown, UserIcon} from "../../shared/icons.tsx";
import {useTranslation} from "react-i18next";

export default function User() {
    const {t} = useTranslation()


    const [imageUrl] = useState<string>()
    const handleLogout = () => {

    }




    return (
        <details className="user">
            <summary>
                <div id="user-avatar">
                    {imageUrl ? <img src={imageUrl} alt="user"/> : <UserIcon/>}
                </div>
                <ChevronDown/>
            </summary>
            <menu>
                <li className="ks-text-2">email</li>
                <li className="ks-text-2">name</li>
                <li className="ks-text-2" id={'logout-option'}>
                    <a onClick={handleLogout}>{t('BUTTON.LOGOUT')}</a>
                </li>
            </menu>
        </details>
    )
}
