import { FC } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { Button, CloseButton } from './Button'

export type Position = null | { x: number, y: number }
export type Visible = boolean

export interface DialogInterface {
    // Visible state of dialog
    visible: boolean

    // Visible state setter of dialog
    setVisible: (visiable: boolean) => void

    // Dialog location information
    position: { x: number, y: number } | null

    // Setter for dialog location information
    setPosition: (position: Position) => void

    // Input field array
    inputs: StyledComponent<'input', any, any, never>[]

    // Callback function registered to the button
    onClick: (...args: any[]) => void
}

export type DialogState = {
    position: Position
    visible: Visible
}

export const Dialog: FC<DialogInterface> = ({ 
    visible, 
    setVisible, 
    position,
    setPosition, 
    inputs, 
    onClick,
}) => {
    const posFilter = (pos: Position | null, axis: 'x' | 'y') => {
        if (pos == null) {
            return 0
        }

        return pos[axis]
    }

    const Wrapper = styled.div<DialogState>`
        position: fixed;
        top: ${({ position }) => posFilter(position, 'y')};
        left: ${({ position }) => posFilter(position, 'x')};
        padding: 24px 32px;
        opacity: ${({ visible }) => visible && '1' || '0'};
        transition: .3s;
        z-index: 1;
        font-weight: 400;
        box-shadow: 0px 2px 10px rgb(176, 176, 176);
        background-color: white;
        border-radius: 5px;
        color: #555555bb;
    `

    const SubmitButton = styled(Button)`
        padding: 7px 28px;
        margin: 0 auto;
    `

    return (
        <Wrapper visible={visible} position={position}>
            {
                inputs.map((Input, c) => {
                    return (
                        <Input key={c} />
                    )
                })
            }
            <CloseButton onClick={() => {
                setPosition({
                    x: 0,
                    y: 0
                })

                setVisible(false)
            }}>
                ×
            </CloseButton>
            <SubmitButton
                onClick={() => onClick()}
                color='#666666' >
                Submit
            </SubmitButton>
        </Wrapper>
    )
}