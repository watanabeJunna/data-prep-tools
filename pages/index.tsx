import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { DataPrep } from '../components/Index'

export default () => {
    const GlobalStyle = createGlobalStyle`
        ${reset}
        body, html {
            font-size: 1.1em;
            margin: 30px 0;
        }

        ::-webkit-scrollbar {
        　　width: 10px;
        }
        ::-webkit-scrollbar-track {
        　　background: #fff;
        　　border-left: solid 1px #ececec;
        }
        ::-webkit-scrollbar-thumb {
        　　background: #ccc;
        　　border-radius: 10px;
        　　box-shadow: inset 0 0 0 2px #fff;
        }
    `

    return (
        <>
            <GlobalStyle />
            <Container>
                <Header />
            </Container>
            <Container>
                <DataPrep />
            </Container>
        </>
    )
}