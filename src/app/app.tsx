import {Outlet} from 'react-router'

import {AppProvider} from './app-provider'
import Aside from "../components/aside/aside.tsx";
import Header from "../components/header/header.tsx";

export default function App() {
    return (
        <>
            <AppProvider>
                <Header/>
                <Aside/>
                <main>
                    <Outlet/>
                </main>
            </ AppProvider>
        </>
    )

}
