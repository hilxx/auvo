import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type TransitionProps = CSSTransitionProps & {
    animation?: 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left',
    wrapper?: boolean
}

const Transition: React.FC<TransitionProps> = props => {
    const { animation, children, classNames, wrapper, ...restProps } = props
    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {
                wrapper ? <main
                    style={{ width: 'max-content' }}
                >
                    {children}
                </main> : children
            }
        </CSSTransition>
    )
}

Transition.defaultProps = {
    appear: true,
    unmountOnExit: true,
    timeout: 300
}

export default React.memo(Transition)


