import { 
    useState,
    useRef,
    FC,
    MouseEvent,
    Dispatch,
    SetStateAction,
    MutableRefObject 
} from 'react'
import styled, { StyledComponent } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { Dialog, Position } from '../components/Dialog'
import { Button } from '../components/Button'
import { InputStyle } from '../components/Input'

export default () => {
    const GlobalStyle = createGlobalStyle`
        ${reset}
        body, html {
            font-size: 1.1em;
            margin: 30px 0;
        }
    `

    return (
        <>
            <GlobalStyle />
            <Container>
                <Header />
            </Container>
            <Container>
                <DataPrepContainer />
            </Container>
        </>
    )
}

const DataPrepContainer: FC = () => {
    const Wrapper = styled.div`
        font-family: ${props => props.theme.fontFamily};
        font-weight: 400;
        box-shadow: 0px 1px 4px rgb(176, 176, 176);
        padding: 25px 0;
    `

    const Header = styled.div`
        display: flex;
        justify-content: flex-end;
        position: relative;
        padding: 24px 48px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    return (
        <Wrapper>
            <Header>
                <LoadDataComponent />
                <ExportDataComponent />
            </Header>
        </Wrapper>
    )
}

const LoadDataComponent = () => {
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

    const onClick = (_: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) {
            return
        }

        const clientPosition: ClientRect | DOMRect = ref.current.getBoundingClientRect()

        const position_ = {
            x: clientPosition.top,
            y: clientPosition.left
        }

        setPosition(position_)
        setVisible(!visible)
    }

    const FileNameInput = styled.input.attrs({
        'placeholder': 'ファイル名',
    })`
        ${InputStyle}
        width: 320px;
    `
    const Inputs: StyledComponent<'input', any, any, never>[] = [FileNameInput]

    return (
        <>
            <Dialog
                visible={visible}
                setVisible={setVisible}
                position={position}
                setPosition={setPosition}
                inputs={Inputs}
                onClick={() => { }}
            />
            <Button
                ref={ref}
                color='#00aeea'
                onClick={onClick}
            >
                <p>Load</p>
            </Button>
        </>
    )
}

const ExportDataComponent = () => {
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

    const onClick = (_: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) {
            return
        }

        const clientPosition: ClientRect | DOMRect = ref.current.getBoundingClientRect()

        const position_: Position = {
            x: clientPosition.top,
            y: clientPosition.left
        }

        setPosition(position_)
        setVisible(!visible)
    }

    const ExportFileNameInput = styled.input.attrs({
        'placeholder': 'ファイル名',
    })`
        ${InputStyle}
        width: 320px;
    `

    const Inputs: StyledComponent<'input', any, any, never>[] = [ExportFileNameInput]

    return (
        <>
            <Dialog
                visible={visible}
                setVisible={setVisible}
                position={position}
                setPosition={setPosition}
                inputs={Inputs}
                onClick={() => { }}
            />
            <Button
                ref={ref}
                color='#00abaa'
                onClick={onClick}
            >
                <p>Export</p>
            </Button>
        </>
    )
}