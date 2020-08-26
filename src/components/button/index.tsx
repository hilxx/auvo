import React, { FC, memo } from 'react'
import classnames from 'classnames'

interface BaseButtonProps {
    disabled?: boolean
    href?: string
    size?: 'sm' | 'lg'
    btnType?: 'default' | 'danger' | 'primary' | 'default' | 'link'
}

export type ButtonProps = Partial<
    & React.ButtonHTMLAttributes<HTMLElement>
    & React.AnchorHTMLAttributes<HTMLElement>
    & BaseButtonProps
>

const Button: FC<ButtonProps> = props => {
    const
        { className, disabled, size, btnType, children, href, ...restProps } = props,
        classNames = classnames('auvo-btn', className, {
            [`btn-${btnType}`]: true,
            [`btn-${size}`]: size,
            'disabled': disabled
        })
    if (btnType === 'link')
        return (
            <a
                href={href}
                className={classNames}
                {...restProps}
            >
                {children}
            </a>
        )
    return (
        <button
            className={classNames}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    )
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

Button.toString = () => 'Button'

export default memo(Button)