import {useEffect, useState} from 'react'
import {Outlet, useLocation} from 'react-router'

import {AppProvider} from './app-provider'
import Aside from "../components/aside/aside.tsx";
import Header from "../components/header/header.tsx";

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    return (
        <AppProvider>
            <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(open => !open)}/>
            <Aside open={menuOpen}/>
            <main>
                <Outlet/>
            </main>
        </AppProvider>
    )
}
