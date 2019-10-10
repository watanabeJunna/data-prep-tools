import styled, { css } from 'styled-components'

type ButtonColor = {
    color: string
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

export const Button = styled.button<ButtonColor>`
    ${Default}    
    color: ${({ color }) => color}ee;
    padding: 12px 24px;
    margin: 0 12px;
    border-radius: 5px;
    border: 2px solid ${({ color }) => color}59;
    transition: .3s;
    &:hover {
        border: 2px solid ${({ color }) => color}aa;
    }
`

export const CloseButton = styled.button`
    ${Default}
    position: absolute;
    top: 0;
    right: 0;
    color: #5f6f81;
    margin 12px 12px 0 0;
    font-size: 1.9em;
`