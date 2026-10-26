import './card-footer.scss';
import { Children, ReactNode } from 'react'


export function RDU_CardFooter({children}: {children?: ReactNode}) {
    return (
        <div className={'rdu-card-footer'} hidden={Children.toArray(children).length === 0}>
            {children}
        </div>
    );
}