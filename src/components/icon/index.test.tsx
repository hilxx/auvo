import React from 'react'
import { library, IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { render } from '@testing-library/react'
import Icon from './index'
library.add(fas)

const defalutProps = {
    icon: 'circle' as IconName
}
describe('test Icon Component', () => {
    test('test default', () => {
        const wrapper = render(<Icon {...defalutProps} />)
    })
})