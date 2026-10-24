import {ReactNode} from "react";
import './card-body.scss'


export function RDU_CardBody({children}: {children?: ReactNode}) {
    return (
        <div className={'rdu-card-body'}>
            {children}
        </div>
    );
}