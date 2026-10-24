import './navigation.scss'

import {useLocation, useNavigate} from 'react-router'
import {Apps, ChevronRight} from '../../shared/icons.tsx'
import {useTranslation} from "react-i18next";

export function Navigation() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const routeRegex = /^\/?([^/?#]+)/
    return (
        <details className={'ks-navigation'}>
            <summary className={'ks-text-4'}>
        <span className={'ks-icon-wrapper'}>
          <Apps/>
        </span>
                <span className={'ks-route'}>{routeRegex.exec(location.pathname)?.[1] ?? ''}</span>
                <ChevronRight/>
            </summary>
            <nav>
                <ul>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/design/buttons')
                        }}>
                            {t('navigation.buttons')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/text')
                        }}>
                            {t('navigation.input-text')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/checkbox')
                        }}>
                            {t('navigation.input-checkbox')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/radio')
                        }}>
                            {t('navigation.input-radio')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/number')
                        }}>
                            {t('navigation.input-number')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/datalist')
                        }}>
                            {t('navigation.input-datalist')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/email')
                        }}>
                            {t('navigation.input-email')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/password')
                        }}>
                            {t('navigation.input-password')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/search')
                        }}>
                            {t('navigation.input-search')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/tel')
                        }}>
                            {t('navigation.input-tel')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/url')
                        }}>
                            {t('navigation.input-url')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/time')
                        }}>
                            {t('navigation.input-time')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/date')
                        }}>
                            {t('navigation.input-date')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/datetime-local')
                        }}>
                            {t('navigation.input-datetime-local')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/color')
                        }}>
                            {t('navigation.input-color')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/range')
                        }}>
                            {t('navigation.input-range')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/hidden')
                        }}>
                            {t('navigation.input-hidden')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/textarea')
                        }}>
                            {t('navigation.input-textarea')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/select')
                        }}>
                            {t('navigation.input-select')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/select-object')
                        }}>
                            {t('navigation.input-select-object')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/file')
                        }}>
                            {t('navigation.input-file')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/month')
                        }}>
                            {t('navigation.input-month')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/inputs/week')
                        }}>
                            {t('navigation.input-week')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/chats/chat-AI')
                        }}>
                            {t('navigation.chat')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/dialogs/offcanvas')
                        }}>
                            {t('navigation.offcanvas')}
                        </a>
                    </li>
                  <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/dialogs/error')
                        }}>
                            {t('navigation.error')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/crud/pokemon')
                        }}>
                            {t('navigation.pokemon-crud')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/crud/pokemon-species')
                        }}>
                            {t('navigation.pokemon-species-crud')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/crud/type')
                        }}>
                            {t('navigation.type-crud')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/paginator')
                        }}>
                            {t('navigation.paginator')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/charts/bar')
                        }}>
                            {t('navigation.charts-bar')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/charts/line')
                        }}>
                            {t('navigation.charts-line')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/charts/pie')
                        }}>
                            {t('navigation.charts-pie')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/charts/scatter')
                        }}>
                            {t('navigation.charts-scatter')}
                        </a>
                    </li>
                    <li>
                        <a className={'ks-text-5'} onClick={() => {
                            navigate('/charts/area')
                        }}>
                            {t('navigation.charts-area')}
                        </a>
                    </li>
                  <li>
                    <a className={'ks-text-5'} onClick={() => {
                      navigate('/pager')
                    }}>
                      {t('navigation.pager')}
                    </a>
                  </li>
                </ul>
            </nav>
        </details>
    )
}
