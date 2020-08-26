import React, { memo, useContext, useMemo, useState } from 'react'
import classnames from 'classnames'
import { context } from './index'
import { functionName as menuItemName } from './item'
import Icon from '../icon'
import Transition from '../transition'

interface ISunMenuProps {
    index?: string
    title: string
    defaultOpen?: boolean
    className?: string
    style?: React.CSSProperties
    disabled?: boolean
    children: React.ReactNode
}

export const functionName = 'SubMenu'
const SubMenu: React.FC<ISunMenuProps> = props => {
    const
        { index, defaultOpen = false, className, style, disabled, children, title } = props,
        { index: currentIndex, direction } = useContext(context),
        [showChildren, setShowChildren] = useState(defaultOpen),
        newChildren = useMemo(() => React.Children.map(children,
            (child: any, key: number) => {
                const name = typeof child.type === 'string' ? child.type : child.type.type.name
                if (name !== menuItemName)
                    console.error(`Warning: Menu has a child@${index}-${key} which is not a MenuItem component`)
                else return React.cloneElement(child, {
                    index: `${index}-${key}`
                })
            }), [children, index]),
        titleTriggerHandles = useMemo(() => direction === 'column'
            ? {
                onClick() { setShowChildren(!showChildren) }
            } : {
                onMouseEnter() { setShowChildren(true); console.log(123) },
                onMouseLeave() { setShowChildren(false); console.log(456) }
            }, [direction, showChildren]),
        wrapClasss = classnames('auvo-submenu auvo-menu-item', {
            'auvo-menu-item-active': currentIndex === index || index === currentIndex.split('-')[0],
            'auvo-submenu-row': direction === 'row',
        }),
        classs = classnames('auvo-submenu-list', className, {
            'menu-disabled': disabled
        }),
        titleIconClasss = classnames('auvo-submenu-title-icon', {
            'auvo-submenu-title-rotate': showChildren
        })

    return (
        <li style={style} className={wrapClasss} {...titleTriggerHandles} >
            <span >
                {title}
                <Icon
                    icon='angle-up'
                    className={titleIconClasss}
                />
            </span>
            <Transition
                in={showChildren}
                animation='zoom-in-top'
                timeout={300}
                wrapper={true}
            >
                <ul className={classs}>
                    {newChildren}
                </ul>
            </Transition>
        </li >
    )
}

export default memo(SubMenu)