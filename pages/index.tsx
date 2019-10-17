import {
    useRef,
    FC,
    MutableRefObject
} from 'react'
import styled, { StyledComponent } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { DialogUtilComponent, DialogSubmitButton, createDialogInput } from '../components/Dialog'

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

    const ButtonTable = styled.div`
        display: flex;
    `

    return (
        <Wrapper>
            <Header>
                <HeaderTitle>
                    Add features
                </HeaderTitle>
                <ButtonTable>
                    <ExportComponent />
                </ButtonTable>
            </Header>
        </Wrapper>
    )
}

const ExportComponent = () => {
    const fileNameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const FileNameInput: StyledComponent<'input', any, any> = createDialogInput({
        placeholder: 'ファイル名'
    })

    const onSubmit = (): void => {
        if (!fileNameInputRef.current) {
            throw new Error('No reference to file name input')
        }

        if (!fileNameInputRef.current.value) {
            return
        }

        const fileName = fileNameInputRef.current.value;

        console.log(fileName)
    }

    return (
        <DialogUtilComponent
            showButtonColor='#00aeea'
            showButtonText='Load'
        >
            <FileNameInput
                ref={fileNameInputRef}
            />
            <DialogSubmitButton
                onClick={onSubmit}
            >
                <p>Submit</p>
            </DialogSubmitButton>
        </DialogUtilComponent>
    )
}