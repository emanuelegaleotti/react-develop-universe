import React from 'react';
import './button.scss';
import clsx from 'clsx';
import {useTranslation} from "react-i18next";

interface RduButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'only';
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'warning'
    | 'error'
    | 'success'
    | 'info'
    | 'light'
    | 'dark'
    | 'ghost'
    | 'link';
  size?: 'small' | 'default' | 'large';
  pill?: boolean;
  alt?: string;
  ariaLabel?: string;
}

export function RDU_Button({
  type,
  text,
  icon,
  iconPosition = 'right',
  id,
  disabled,
  onClick,
  variant = 'primary',
  size = 'default',
  pill,
  alt: _alt,
  ariaLabel: _ariaLabel,
  ...rest
}: RduButtonProps) {
  const { t } = useTranslation()
  const translatedText = t(`rdu.button.${text}`);

  return (
    <button
      {...rest}
      type={type}
      className={clsx('rdu-button', `rdu-${variant}`, size !== 'default' && `rdu-${size}`, pill && 'rdu-pill')}
      title={translatedText}
      aria-label={translatedText}
      id={id}
      disabled={disabled}
      onClick={onClick}
    >
      {iconPosition !== 'only' && (
        <span className={clsx('rdu-button-text', `rdu-${iconPosition}`)}>
          {translatedText}
        </span>
      )}
      {icon && (
        <span
          className={clsx('rdu-button-icon', `rdu-${iconPosition}`)}
          aria-label={translatedText}
        >
          {icon}
        </span>
      )}
    </button>
  );
}
