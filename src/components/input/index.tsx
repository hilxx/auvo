import React, {
    memo,
    useState,
    InputHTMLAttributes,
    ReactElement,
    ChangeEvent,
    forwardRef,
    useRef,
} from 'react'
import classnames from 'classnames'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import useClick from '../../hooks/useClick'
import Icon from '../icon'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean
    size?: 'sm' | 'lg'
    icon?: IconName,
    /* 前缀 */
    pre?: string | ReactElement
    /* 后缀 */
    post?: string | ReactElement
    ref?: { current: any }
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
const Input: React.FC<InputProps> = forwardRef((props, ref) => {
    const
        { className, disabled, size, icon, pre, post, ...restProps } = props,
        [isFocus, setIsFocus] = useState(false),
        wrapRef = useRef<HTMLDivElement>(null),
        classs = classnames('auvo-input-wrap', className, {
            'auvo-input-disabled': disabled,
            [`auvo-input-${size}`]: true,
            'auvo-input-focus': isFocus
        })

    useClick(bool => setIsFocus(bool), [wrapRef])
    return (
        <div
            ref={wrapRef}
            data-testid='test-input'
            className={classs}
        >
            {
                pre ? <aside className='auvo-input-pre'>{pre}</aside> : null
            }
            <input
                ref={ref}
                {...restProps}
            />
            {
                icon ? <Icon icon={icon} /> : null
            }
            {
                post ? <aside className='auvo-input-post'>{post}</aside> : null
            }
        </div>

    )
})

export default memo(Input)