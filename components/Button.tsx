import styled, { css, StyledComponent } from 'styled-components'

interface ButtonColor {
    color?: string
}

const Default = css`
    display: block;
    font-size: 1.1em;
    padding: 0;
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
`

const HighConcentration = 'ee'

const MediumConcentration = 'aa'

const LowConcentration = '56'

const defaultColor = '#666666'

export const Button: StyledComponent<'button', {}> = styled.button<ButtonColor>`
    ${Default}    
    color: ${({ color = defaultColor }) => color + HighConcentration};
    padding: 12px 24px;
    margin: 0 12px;
    border-radius: 5px;
    border: 2px solid ${({ color = defaultColor }) => color + LowConcentration};
    transition: .3s;
    &:hover {
        border: 2px solid ${({ color = defaultColor }) => color + MediumConcentration};
    }
`

export const CloseButton: StyledComponent<'button', {}> = styled.button`
    ${Default}
    position: absolute;
    top: 0;
    right: 0;
    color: #5f6f81;
    margin 12px 12px 0 0;
    font-size: 1.9em;
    &:after {
        content: '×'
    }
`