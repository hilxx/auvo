import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './index'

const
    defaultProps = {
        btnType: 'default',
        size: 'lg',
        className: 'test',
        onClick: jest.fn(),
    },
    disabledProps = {
        disabled: true,
        onClick: jest.fn()
    }

/* 实际分类 */
describe('test Button component', () => {
    test('default button', () => {
        const
            wrapper = render(<Button {...defaultProps} autoFocus={true}>Nice</Button>),
            element = wrapper.getByText('Nice')
        expect(element.localName).toEqual('button')
        expect(element).toHaveClass('auvo-btn btn-default')
        expect(element).toHaveFocus()
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    test('different props', () => {
        const
            { getByText } = render(<Button {...defaultProps}>test</Button>),
            element = getByText('test')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('auvo-btn btn-default btn-lg test')
    })
    test('btnType equals link', () => {
        const
            { getByText } = render(<Button btnType='link'>Link</Button>),
            element = getByText('Link')
        expect(element.localName).toEqual('a')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('auvo-btn btn-link')
    })
    test('disabled set to true ', () => {
        const
            { getByText } = render(<Button {...disabledProps}>disabled</Button>),
            element = getByText('disabled') as HTMLButtonElement
        expect(element.localName).toEqual('button')
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})