import React, { memo, useContext } from 'react'
import classnames from 'classnames'
import { context } from './index'
export interface IMenuItemProps {
    index?: string
    className?: string
    style?: React.CSSProperties
    disabled?: boolean
    children: React.ReactNode
}

export const functionName = 'MenuItem'
const MenuItem: React.FC<IMenuItemProps> = props => {
    const
        { index, children, style, disabled } = props,
        { index: currentIndex, onSelect } = useContext(context),
        classs = classnames('auvo-menu-item', {
            'auvo-menu-item-active': currentIndex === index,
            'auvo-menu-disabled': disabled
        })
    return (
        <li className={classs} style={style} onClick={() => disabled || onSelect(index + '')} >
            {children}
        </li>
    )
}

export default memo(MenuItem)