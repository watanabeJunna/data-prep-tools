import { useRef, FC, MutableRefObject } from 'react'
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
    const ref: MutableRefObject<HTMLDivElement | null> = useRef(null)

    const coordinateMachining = (
        position: Position, 
        axis: 'x' | 'y', 
        ref: MutableRefObject<HTMLDivElement | null>
    ): string => {
        if (!ref.current) {
            return '0'
        }

        let newPosition: number = position[axis]

        const [xMergin, yMargin] = [30, 70]

        switch (axis) {
            case 'x':
                newPosition = newPosition - ref.current.clientWidth - xMergin
                break
            case 'y':
                newPosition = newPosition - yMargin
                break
            default:
                throw new Error('Axis is not appropriate')
        }

        return newPosition.toString()
    }

    const Wrapper = styled.div<DialogWrapperProps>`
        position: fixed;
        top: ${({ position }) => coordinateMachining(position, 'y', ref)}px;
        left: ${({ position }) => coordinateMachining(position, 'x', ref)}px;
        padding: 24px 32px;
        opacity: ${({ visible }) => visible && '1' || '0'};
        z-index: 0;
        font-weight: 400;
        box-shadow: 0px 2px 10px rgb(176, 176, 176);
        background-color: white;
        border-radius: 5px;
        transition: all .7s ease-out;
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
        <Wrapper
            ref={ref}
            visible={visible}
            position={position}
        >
            <CloseButton onClick={() => {
                setPosition({
                    x: 0,
                    y: 0
                })

                setVisible(false)
            }} />
            {Inputs}
            <SubmitButton
                onClick={() => onClick()}
                color={gray}
            >
                <p>Submit</p>
            </SubmitButton>
        </Wrapper>
    )
}