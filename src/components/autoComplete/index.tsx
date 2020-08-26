import React, { memo, ReactElement, useState, useCallback, useRef, SyntheticEvent } from 'react'
import Input, { InputProps } from '../input'
import Icon from '../icon'
import useClick from '../../hooks/useClick'

export type SourceItemType = {
    value: string
}
export interface AutoCompleteProps extends Omit<InputProps, 'onSubmit'> {
    renderOption?: (item: SourceItemType, index?: number) => ReactElement | string
    onSubmit?: (str: string) => void
    suggestList?: SourceItemType[]
    loading?: boolean
}

const AutoComplete: React.FC<AutoCompleteProps> = props => {
    const
        {
            renderOption = (item: SourceItemType) => item.value,
            onSubmit,
            suggestList = [],
            loading,
            ...restProps
        } = props,
        [showSuggest, setShowSuggest] = useState(false),
        [currentInputValue, setCurrentInputValue] = useState(''),
        [hoverIndex, setHoverIndex] = useState(0),
        wrapRef = useRef<HTMLDivElement>(null),
        inputRef = useRef<HTMLInputElement>(null),
        handleSelect = useCallback((index: string | number) => {
            const value = typeof index === 'number'
                ? suggestList[index - 1].value
                : index
            if (value) {
                const input = inputRef.current
                input && (input.value = value)
                setCurrentInputValue(value)
                onSubmit && onSubmit(value)
            }
        }, [inputRef, suggestList, onSubmit]),
        handleClick = useCallback((e: SyntheticEvent) => {
            const
                el = e.target as HTMLElement,
                index = el.getAttribute('data-index')
            index && handleSelect(index)
        }, [handleSelect]),
        handleKeyUp = useCallback((e: any) => {
            const { keyCode } = e
            switch (keyCode) {
                case 13:  /* 回车 */
                    handleSelect(hoverIndex)
                    break
                case 38:  /* 上 */
                    setHoverIndex(hoverIndex ? hoverIndex - 1 : suggestList.length)
                    break
                case 40:  /* 下 */
                    setHoverIndex(hoverIndex === suggestList.length ? 0 : hoverIndex + 1)
                    break
            }
        }, [hoverIndex, suggestList, handleSelect])

    useClick(bool =>  setShowSuggest(bool), [wrapRef])

    return (
        <div
            ref={wrapRef}
            onChange={(e: any) => setCurrentInputValue(e.target.value)}
            className='auto-autoComplete'
            onKeyDownCapture={handleKeyUp}
            onClick={handleClick}
        >
            <Input {...restProps} ref={inputRef} />
            <ul
                className={showSuggest ? '' : 'dis-none'}
            >
                <li
                    data-index='0'
                    className={(currentInputValue ? '' : 'dis-none ')
                        + (hoverIndex === 0 ? 'autoComplete-item-hover ' : '')
                    }
                >
                    搜索：{currentInputValue}
                </li>
                {
                    loading
                        ? <Icon spin icon='spinner' />
                        : suggestList.map((suggest, index) =>
                            <li
                                data-index={index + 1}
                                className={hoverIndex === index + 1 ? 'autoComplete-item-hover ' : ''}
                                key={suggest.value}
                            >
                                {renderOption(suggest, index)}
                            </li>
                        )
                }
            </ul>
        </div>
    )
}


export default memo(AutoComplete)