

import React, { useState, ChangeEvent } from 'react';
import { storiesOf } from '@storybook/react';
import AutoComplete from './index'
import useDebounce from '../../hooks/useDebounce'
const DefaultComponent = () => {
    const
        [suggestList, setsuggestList] = useState([]),
        [loading, setLoading] = useState(false),
        [inputValue, setInputValue] = useState(''),
        handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setLoading(true)
            setInputValue(e.target.value)
        }

    useDebounce(() => {
        const formatValue = inputValue.trim()
        if (formatValue)
            fetch('https://api.github.com/search/users?q=' + formatValue)
                .then(res => res.json())
                .then(({ items }) => {
                    const formatItems = items.map((item: any) => ({ value: item.login, ...item })).slice(0, 10)
                    setsuggestList(formatItems)
                    setLoading(false)
                })
    }, [inputValue], 500)

    return (
        <AutoComplete
            value={inputValue}
            suggestList={suggestList}
            onChange={handleChange}
            renderOption={(item, index) => item.value}
            loading={loading}
        />
    )
}


storiesOf('AutoComplete', module)
    .add('默认', DefaultComponent)