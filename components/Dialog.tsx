import { 
    useState,
    useRef,
    FC,
    Dispatch,
    SetStateAction,
    MutableRefObject 
} from 'react'
import styled from 'styled-components'
import { Button, CloseButton } from './Button'
import { InputStyle } from '../components/Input'

export interface Position { 
    // X coordinate of the dialog
    x: number,

    // Y coordinate of the dialog
    y: number
}

export interface IDialogInput {
    ref: MutableRefObject<HTMLInputElement | null>
    attributes: object
}

export const DialogInput: FC<IDialogInput> = ({
    ref, 
    attributes
}): JSX.Element => {
    const Input = styled.input.attrs(attributes)`
        ${InputStyle}
        width: 320px;
    `
    
    return (
        <Input ref={ref} />       
    )
}

export interface IDialogUtilComponent {
    toggleButtonColor: string
    toggleButtonText: string
    buttonName: string
    callback: (...args: any) => void
    inputs: IDialogInput[]
}

export const DialogUtilComponent: FC = () => {
    const [visible, setVisible]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const [position, setPosition]: [
        Position, 
        Dispatch<SetStateAction<Position>>
    ] = useState<Position>({
        x: 0,
        y: 0
    })

    const ref: MutableRefObject<HTMLButtonElement | null> = useRef(null)

    const onClick = () => {
        if (!ref.current) {
            return
        }

        if (visible) {
            setPosition({
                x: 0,
                y: 0
            })
        } else {
            const clientPosition: ClientRect | DOMRect = ref.current.getBoundingClientRect()

            const right = clientPosition.right
            const width = clientPosition.width
            const scrollLeft = document.body.scrollLeft
            const clientLeft = document.documentElement.clientLeft

            const position_: Position = {
                x: right + scrollLeft - clientLeft - width,
                y: clientPosition.top
            }
            setPosition(position_)
        }
        
        setVisible(!visible)
    }

    return (
        <>
        <Dialog
            visible={visible}
            setVisible={setVisible}
            position={position}
            setPosition={setPosition}
            inputs={inputs}
            buttonName={buttonName}
            callback={callback}
        />
            <Button
                ref={ref}
                color={toggleButtonColor}
                onClick={onClick}
            >
                <p>{toggleButtonText}</p>
            </Button>
        </>
    )
}

export interface IDialog {
    // Visible state of dialog
    visible: boolean

    // Visible state setter of dialog
    setVisible: (visiable: boolean) => void

    // Dialog location information
    position: Position

    // Setter for dialog location information
    setPosition: (position: Position) => void

    // Input field array
    inputs: JSX.Element[]

    // Button display name
    buttonName: string

    // Callback function registered to the button
    callback: (...args: any[]) => void
}

export const Dialog: FC<IDialog> = ({ 
    visible, 
    setVisible, 
    position,
    setPosition, 
    inputs, 
    callback,
    buttonName,
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

    type WrapperProps = {
        position: Position
        visible: boolean
    }

    const Wrapper = styled.div<WrapperProps>`
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
            {inputs}
            <SubmitButton
                onClick={() => callback()}
                color={gray}
            >
                <p>{buttonName}</p>
            </SubmitButton>
        </Wrapper>
    )
}