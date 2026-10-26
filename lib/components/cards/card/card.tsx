import {ReactNode} from "react";
import clsx from 'clsx';
import './card.scss';

export interface RduCardProps {
    children?: ReactNode
    variant?: 'default' | 'outlined' | 'elevated' | 'accent'
}

export function RDU_Card({children, variant = 'default'}: RduCardProps) {
    return (
        <div className={clsx('rdu-card', variant !== 'default' && `rdu-card--${variant}`)}>
            {children}
        </div>
    );
}
