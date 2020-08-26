import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Input from './index'

const
    defaultProps = {
        size: 'lg',
        pre: 'pre',
        post: 'post',
        onChange: jest.fn()
    },
    disableProps = {
        onFocus: jest.fn(),
        disabled: true
    }

describe('test Input Component', () => {
    test('test default', () => {
        const
            wrapper = render(<Input {...defaultProps} />),
            el = wrapper.getByTestId('test-input'),
            preEl: HTMLInputElement = wrapper.getByText('pre'),
            postEl: HTMLInputElement = wrapper.getByText('post'),
            inputEl: HTMLInputElement = el.querySelector('input') as HTMLInputElement

        expect(el).toBeInTheDocument()
        expect(preEl).toBeInTheDocument()
        expect(postEl).toBeInTheDocument()
        expect(el).toHaveClass('auvo-input-lg')
        fireEvent.change(inputEl, { target: { value: 'zzz' } })
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(inputEl.value).toEqual('zzz')
    })

    test('test disable', () => {
        const
            wrapper = render(<Input {...disableProps} />),
            el = wrapper.getByTestId('test-input')
        expect(el).toBeInTheDocument()
        expect(el).toHaveClass('auvo-input-disabled')
        fireEvent.focus(el)
        expect(el).not.toHaveFocus()
    })
})