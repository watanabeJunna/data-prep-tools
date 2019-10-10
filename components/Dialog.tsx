import { FC } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { Button, CloseButton } from './Button'

export interface DialogInterface {
    // Visible state of dialog
    visible: boolean

    // Visible state setter of dialog
    setVisible: (visiable: boolean) => void

    // Pos
    pos: { x: number, y: number } | null

    // Visible state setter of dialog
    setPos: (pos: Pos) => void

    // Input field array
    inputs: StyledComponent<'input', any, any, never>[]

    // Callback function registered to the button
    onClick: (...args: any[]) => void
}

type Pos = null | { x: number, y: number }
type Visible = boolean

export type DialogState = {
    pos: Pos
    visible: Visible
}

export const Dialog: FC<DialogInterface> = ({ visible, setVisible, pos, setPos, inputs, onClick }) => {
    const posFilter = (pos: Pos | null, axis: 'x' | 'y') => {
        if (pos == null) {
            return 0
        }

        return pos[axis]
    }

    const Wrapper = styled.div<DialogState>`
        position: fixed;
        top: ${({ pos }) => posFilter(pos, 'y')};
        left: ${({ pos }) => posFilter(pos, 'x')};
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
        <Wrapper visible={visible} pos={pos}>
            {
                inputs.map((Input, c) => {
                    return (
                        <Input key={c} />
                    )
                })
            }
            <CloseButton onClick={() => {
                setPos({
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