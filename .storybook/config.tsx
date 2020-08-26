import React from 'react'
import '../src/styles/index.scss'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const MarginDecorator = (fn: any) => <div style={{
    margin: '1rem auto',
    display: 'flex',
    justifyContent: 'center'
}}
>{fn()}</div>
addDecorator(MarginDecorator)
addDecorator(withInfo)