import styled from 'styled-components'
import OperationContent from './OperationContent'

export default () => {
    const Header = styled.div`
        justify-content: space-between;
        position: relative;
        padding: 24px 48px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const HeaderTextContent = styled.div`
        display: flex;
        justify-content: flex-start;
        margin-left: 12px;
        margin-bottom: 24px;
        font-size: 1.5em;
        color: #5f6f81;
    `

    return (
        <Header>
            <HeaderTextContent>
                Features Editor
            </HeaderTextContent>
            <OperationContent />
        </Header>
    )
}