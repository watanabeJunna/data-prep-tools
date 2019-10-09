import styled, { StyledComponentBase } from 'styled-components'

export const Header = () => {
    return (
        <HeaderWrapper>
            Features Annotation
        </HeaderWrapper>
    )
}

const HeaderWrapper: StyledComponentBase<any, any> = styled.nav`
    color: #5f6f81;
    font-size: 1.9em;
    font-family: 'Raleway', sans-serif;
    padding: 18px 32px 18px 0;
    border-bottom: 1px solid #afafbc;
    margin-bottom: 50px;
`