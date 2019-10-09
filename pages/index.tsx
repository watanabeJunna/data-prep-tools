import { useRef, useState, FC, MutableRefObject, MouseEvent } from 'react'
import styled, { css } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header as CommonHeader } from '../components/Header'
import { Container as CommonContainer } from '../components/Container'

export default () => {
    const GlobalStyle = createGlobalStyle`
        ${reset}

        body, html {
            font-size: 1.2em;
            margin: 30px 0;
        }
    `

    return (
        <>
            <GlobalStyle />
            <CommonContainer>
                <CommonHeader />
            </CommonContainer>
            <CommonContainer>
                <Container />
            </CommonContainer>
        </>
    )
}

const Container: FC = () => {
    const [visible, setVisible] = useState(false)
    const fileNameInputRef = useRef<HTMLInputElement | null>(null)

    const submit = async () => {
        if (!fileNameInputRef.current) {
            console.log('!fileNameInputRef.current')
            return
        }

        fileNameInputRef.current.focus()

        console.log(fileNameInputRef.current.value)
    }

    return (
        <Wrapper>
            <Header>
                <LoadDataDialog
                    visible={visible}
                    ref={fileNameInputRef}
                />
                <button onClick={(_: MouseEvent<HTMLButtonElement>) => setVisible(!visible)}>show</button>
                <button onClick={(_: MouseEvent<HTMLButtonElement>) => submit()}>a</button>
            </Header>
        </Wrapper>
    )
}


const LoadDataDialog = (props: {
    visible: boolean
    ref: MutableRefObject<HTMLInputElement | null>
}) => {

    return (
        <LoadDataDialogWrapper
            visible={props.visible}>
            <FileNameInput ref={props.ref} />
        </LoadDataDialogWrapper>
    )
}

const Wrapper = styled.div`
    font-family: ${props => props.theme.fontFamily};
    font-weight: 400;
    box-shadow: 0px 1px 4px rgb(176, 176, 176);
    padding: 25px 0;
`

const Header = styled.div`
    display: flex;
    position: relative; 
    justify-content:space-between;
    border-bottom: 1px solid rgba(176, 176, 176, 0.5);
`

type Props = {
    visible?: boolean
}

const LoadDataDialogWrapper = styled.div<Props>`
    position: absolute;
    right: 70px;
    top: -50px;
    padding: 24px 12px;
    transition: .3s;
    opacity: ${props => props.visible && '1' || '0'};
    z-index: 1;
    font-weight: 400;
    box-shadow: 0px 2px 10px rgb(176, 176, 176);
    background-color: white;
    border-radius: 5px;
    color: #555555bb;
`

// const DialogHeader = styled.div`
//     color: #5f6f81;
//     font-size: 1.3em;
//     margin: 0 12px 25px 12px;
// `

const CommonInput = css`
    display: block;
    padding: 0;
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
    margin: 25px 12px;
    border-bottom: 1px solid #dee7ec;
    transition: .5s;
    width: 200px;
    padding: 7px 0;
    &:focus {
        border-bottom: 1px solid #228aff;
    }
`

const FileNameInput = styled.input.attrs({
    'placeholder': 'ファイル名',
})`
    ${CommonInput}
`