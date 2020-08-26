import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './index';
import { useState } from '@storybook/addons';

const
    DefaultInput = () => {
        const [value, setValue] = useState('')
        return <Input
            value={value}
            onChange={e => {
                action(`onChange value: ${e.target.value}`)
                setValue(e.target.value)
            }}
            onClick={e => action('click')}
        />
    }
    ,
    SizeButton = () => (
        <>
            <Input size='sm' />
            <Input size='lg' />
        </>
    ),
    PreInput = () => <Input pre='https://' />,
    postInput = () => <Input post='.com' />,
    IconInput = () => <Input icon='mask' />

storiesOf('Input', module)
    .add('默认', DefaultInput)
    .add('不同大小', SizeButton)
    .add('前缀', PreInput)
    .add('后缀', postInput)
    .add('带图标', IconInput)