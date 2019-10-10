import { useState, useRef, FC, MouseEvent } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { Dialog } from '../components/Dialog'
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
                <AnnotationContainer />
            </Container>
        </>
    )
}

const AnnotationContainer: FC = () => {
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
                <LoadDataFunctionWrapper />
                <ExportFunctionWrapper />
            </Header>
        </Wrapper>
    )
}

const LoadDataFunctionWrapper = () => {
    const [visible, setVisible] = useState()
    const [pos, setPos] = useState()

    let ref = useRef<HTMLButtonElement | null>(null)

    const onClick = (_: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) {
            return
        }

        const clientPos: ClientRect | DOMRect = ref.current.getBoundingClientRect()

        let pos = {
            x: clientPos.top,
            y: clientPos.left
        }

        setPos(pos)
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
                pos={pos}
                setPos={setPos}
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

const ExportFunctionWrapper = () => {
    const [visible, setVisible] = useState()
    const [pos, setPos] = useState()

    let ref = useRef<HTMLButtonElement | null>(null)

    const onClick = (_: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) {
            return
        }

        const clientPos: ClientRect | DOMRect = ref.current.getBoundingClientRect()

        let pos = {
            x: clientPos.top,
            y: clientPos.left
        }

        setPos(pos)
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
                pos={pos}
                setPos={setPos}
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