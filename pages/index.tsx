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
        justify-content: space-between;
        position: relative;
        padding: 24px 48px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const HeaderTitle = styled.div`
        font-size: 1.5em;
        color: #5f6f81;
        margin: auto 0;
    `

    const ComponentTable = styled.div`
        display: flex;
    `

    return (
        <Wrapper>
            <Header>
                <HeaderTitle>
                    Add features
                </HeaderTitle>
                <ComponentTable>
                    <LoadDataComponent />
                    <ExportDataComponent />
                </ComponentTable>
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

    const blue = '#00aeea'

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
                color={blue}
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

    const FileNameInput = styled.input.attrs({
        'placeholder': 'ファイル名',
    })`
        ${InputStyle}
        width: 320px;
    `

    const Inputs: StyledComponent<'input', any, any, never>[] = [FileNameInput]

    const green = '#00abaa'

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
                color={green}
                onClick={onClick}
            >
                <p>Export</p>
            </Button>
        </>
    )
}