import { FC } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { Button, CloseButton } from './Button'

export interface Position { 
    // X coordinate of the dialog
    x: number,

    // Y coordinate of the dialog
    y: number
}

export interface DialogInterface {
    // Visible state of dialog
    visible: boolean

    // Visible state setter of dialog
    setVisible: (visiable: boolean) => void

    // Dialog location information
    position: Position

    // Setter for dialog location information
    setPosition: (position: Position) => void

    // Input field array
    inputs: StyledComponent<'input', any, any, never>[]

    // Callback function registered to the button
    onClick: (...args: any[]) => void
}

export type DialogWrapperProps = {
    position: Position
    visible: boolean
}

export const Dialog: FC<DialogInterface> = ({ 
    visible, 
    setVisible, 
    position,
    setPosition, 
    inputs, 
    onClick,
}) => {
    const coordinateMachining = (position: Position, axis: 'x' | 'y'): string => {
        let newPosition: number = position[axis]

        return newPosition.toString()
    }

    const Wrapper = styled.div<DialogWrapperProps>`
        position: fixed;
        top: ${({ position }) => coordinateMachining(position, 'y')};
        left: ${({ position }) => coordinateMachining(position, 'x')};
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

    const Inputs = inputs.map((Input, c) => {
        return (
            <Input key={c} />
        )
    })

    const gray = '#666666'

    return (
        <Wrapper visible={visible} position={position}>
            {Inputs}
            <CloseButton onClick={() => {
                setPosition({
                    x: 0,
                    y: 0
                })

                setVisible(false)
            }} />
            <SubmitButton
                onClick={() => onClick()}
                color={gray}
            >
                Submit
            </SubmitButton>
        </Wrapper>
    )
}