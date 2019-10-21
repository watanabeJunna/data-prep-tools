import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { DataPrepContainer } from '../components/Index'

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