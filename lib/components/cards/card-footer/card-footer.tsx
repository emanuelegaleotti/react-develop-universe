import './card-footer.scss';
import { ReactNode } from 'react'


export function RDU_CardFooter({children}: {children?: ReactNode}) {
    return (
        <div className={'rdu-card-footer'}>
            {children}
        </div>
    );
}