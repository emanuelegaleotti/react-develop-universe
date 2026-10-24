import {ReactNode} from "react";
import './card.scss';

export function RDU_Card({children}: {children?: ReactNode}) {
    return (
        <div className={'rdu-card'}>
            {children}
        </div>
    );
}