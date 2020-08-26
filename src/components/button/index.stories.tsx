import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './index';

const
    DefaultButton = () => (
        <Button onClick={action('clicked')}>
            defaul
        </Button>
    ),
    SizeButton = () => (
        <>
            <Button size='sm'>
                small
            </Button>
            <Button size='lg'>
                large
            </Button>
        </>
    )

storiesOf('Button', module)
    .add('默认Button', DefaultButton)
    .add('大小Button', SizeButton)