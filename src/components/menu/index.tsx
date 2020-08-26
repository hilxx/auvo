import React, { memo, createContext, useMemo, useState } from 'react'
import classnames from 'classnames'
import MenuItem, { functionName as menuItemName } from './item'
import SubMenu, { functionName as subMenuName } from './submenu'

type selectHandleType = (index: string) => void
type direction = 'row' | 'column'

export interface IMenuProps {
    defaultIndex?: number | string
    onSelect?: selectHandleType
    direction?: direction
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

interface IContextType {
    index: string,
    onSelect: selectHandleType
    direction: direction
}

export const context = createContext<IContextType>({
    index: '0',
    direction: 'row',
    onSelect: Function.prototype as selectHandleType
})

const Menu: React.FC<IMenuProps> = props => {
    const
        { children, defaultIndex = 0, onSelect, direction = 'row', className, style } = props,
        [index, setIndex] = useState(defaultIndex + ''),
        providerValue: IContextType = useMemo(() => ({
            index,
            direction,
            onSelect(newIndex) {
                setIndex(newIndex)
                onSelect && onSelect(newIndex)
            }
        }), [index, onSelect, direction]),
        classs = useMemo(() => classnames('auvo-menu', className, {
            'auvo-menu-column': direction === 'column'
        }), [className, direction]),
        newChildren = useMemo(() => React.Children.map(children,
            (child: any, index: number) => {
                const name = typeof child.type === 'string' ? child.type : child.type.type.name
                if (name !== menuItemName && name !== subMenuName)
                    console.error(`Warning: Menu has a child@${index} which is not a MenuItem | SubMenu component`)
                else return React.cloneElement(child, {
                    index: index + ''
                })
            }), [children])

    return (
        <ul className={classs} style={style} data-testid='test-menu'>
            <context.Provider value={providerValue}>
                {newChildren}
            </context.Provider>
        </ul>
    )
}

export default memo(Menu)
export { MenuItem, SubMenu }