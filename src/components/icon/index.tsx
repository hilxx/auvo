import React from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
type ThemeTypes = 'primary' | 'secondary' | 'success' | 'info' | 'warning'
    | 'danger' | 'light' | 'dark'

interface IIconProps extends FontAwesomeIconProps {
    theme?: ThemeTypes
}
const Icon: React.FC<IIconProps> = (props) => {
    const
        { theme, className, ...restProps } = props,
        classs = classnames('auvo-icon', className, {
            [`auvo-color-${theme}`]: true
        })
    return (
        <FontAwesomeIcon {...restProps} className={classs} />
    )
}

export default React.memo(Icon)