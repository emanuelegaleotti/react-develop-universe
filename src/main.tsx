import ReactDOM from 'react-dom/client'

import './sass/styles.scss'
import {routes} from "./app/routes.ts";
import {RouterProvider} from "react-router";
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={routes}/>
)
