import {Children, ReactNode} from "react";
import './card-header.scss';

export function RDU_CardHeader({children}: {children?: ReactNode}) {
    return (
        <div className={'rdu-card-header'} hidden={Children.toArray(children).length === 0}>
            {children}
        </div>
    );
}