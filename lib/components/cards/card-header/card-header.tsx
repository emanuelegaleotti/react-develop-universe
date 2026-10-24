import {ReactNode} from "react";
import './card-header.scss';

export function RDU_CardHeader({children}: {children?: ReactNode}) {
    return (
        <div className={'rdu-card-header'}>
            {children}
        </div>
    );
}