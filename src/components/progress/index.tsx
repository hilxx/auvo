import React, { HTMLAttributes } from 'react'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value: number
    showNumber?: boolean
    height?: number
    width?: string
    theme?: 'primary' | 'secondary' | 'success' | 'info' | 'warning'
    | 'danger' | 'light' | 'dark'
}

const Progress: React.FC<ProgressProps> = props => {
    const
        {
            value,
            showNumber,
            height = .8,
            width = '100%',
            style,
            theme = 'primary',
            className = '',
            ...restProps
        } = props,
        percent = parseFloat(width) * value + '%'
    return (
        <div
            className={`auvo-progress auvo-back-${theme} ${className}`}
            style={{
                ...style,
                height: `${height}rem`,
                width,
            }}
            {...restProps}
        >
            <main
                style={{ width: percent }}
                className={`auvo-back-${theme}`}
            >
                {
                    showNumber ?
                        <span
                            className='auvo-progress-value'
                            style={{ lineHeight: height }}
                        >
                            {percent}
                        </span>
                        : null
                }
            </main>
        </div >
    )
}

export default React.memo(Progress)