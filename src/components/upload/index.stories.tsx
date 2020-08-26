import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';
import Upload from './index';

/* https://www.mocky.io/v2/5cc8019d300000980a055e76 */
const
    DefaultUpload = () => (
        <Upload
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            progress={true}
            onProgress={e => console.log(e.percent)}
            multiple
            accept='.txt'
            headers={{ 'X-Power-Max': '2020-8-12' }}
        />
    ),
    DragUplad = () => (
        <Upload
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            progress={true}
            multiple
            headers={{ 'X-Power-Max': '2020-8-12' }}
            drag={true}
        />
    ),
    Test = () => {
        const [count, setCount] = useState(0)
        console.log('函数体外', count)
        return (
            <div onClick={e => {
                setCount(count + 1)
                console.log('函数体内', count)
            }}>
                {count}
            </div>
        )
    }

storiesOf('Upload', module)
    .add('默认', DefaultUpload)
    .add('拖动', DragUplad)
    .add('test', Test)