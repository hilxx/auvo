import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Menu, { IMenuProps, MenuItem, SubMenu } from './'

const
    testProps: IMenuProps = {
        defaultIndex: 0,
        onSelect: jest.fn(),
        className: 'test'
    },
    testColumnProps: IMenuProps = {
        defaultIndex: 0,
        direction: 'column'
    },
    generatorMenu = (props: IMenuProps) => {
        return (
            <Menu {...props}>
                <MenuItem>active</MenuItem>
                <MenuItem disabled={true}>disabled</MenuItem>
                <MenuItem>click</MenuItem>
                <SubMenu title='dropdown'>
                    <MenuItem>drop1</MenuItem>
                </SubMenu>
            </Menu>
        )
    }

let wrapper: RenderResult = null,
    menuEle: HTMLElement,
    activeEle: HTMLElement,
    disabledEle: HTMLElement,
    clickEle: HTMLElement
describe('test Menu and MenuItem componnet', () => {
    beforeEach(() => {
        wrapper = render(generatorMenu(testProps))
        menuEle = wrapper.getByTestId('test-menu')
        activeEle = wrapper.getByText('active')
        disabledEle = wrapper.getByText('disabled')
        clickEle = wrapper.getByText('click')
    })
    test('should render corrent Menu and MenuItem based on default props', () => {
        expect(menuEle).toBeInTheDocument()
        expect(menuEle).toHaveClass('auvo-menu test')
        expect(menuEle.childElementCount).toEqual(4)
        expect(activeEle).toHaveClass('auvo-menu-item auvo-menu-item-active')
        expect(disabledEle).toHaveClass('auvo-menu-item auvo-menu-disabled')
    })
    test('click items should change active and call the right callback', () => {
        fireEvent.click(clickEle)
        expect(clickEle).toHaveClass('auvo-menu-item-active auvo-menu-item')
        expect(activeEle).not.toHaveClass('auvo-menu-item-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledEle)
        expect(disabledEle).not.toHaveClass('auvo-menu-item-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    test('should render direction: "column" when direction is set to column', () => {
        cleanup()
        wrapper = render(generatorMenu(testColumnProps))
        menuEle = wrapper.getByTestId('test-menu')
        expect(menuEle).toHaveClass('auvo-menu-column')
    })
    test('should show dropdown items when hover on subMenu', () => {
        const dropdown = wrapper.getByText('dropdown').parentNode
        expect(dropdown).toBeInTheDocument()
    })
})