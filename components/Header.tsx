import styled, { css } from 'styled-components'
import { RootState } from '../store/reducer'
import { useSelector } from 'react-redux'

export const Header: React.FC = () => {
    const [currentChunkNumber, loadFilename] =
        useSelector((state: RootState) => {
            return [
                state.currentChunkNumber.currentChunkNumber,
                state.loadFilename.loadFilename
            ]
        })
    
    const HeaderWrapper = styled.nav`
        color: #5f6f81;
        font-size: 1.9em;
        font-family: 'Raleway', sans-serif;
        padding: 18px 32px 18px 0;
        border-bottom: 1px solid #afafbc;
    `

    const Breadcrumbs = styled.div`
        display: flex;
        padding: 38px 0;
        color: #777777;
        font-size: 1.1em;
    `

    const HeaderTitle = styled.div``

    const breadcrumbsIcon = css`
        &::before {
            content: '>';
            font-size: 0.85em;
            font-family: 'Raleway', Arial, sans-serif;
            font-weight: 100;
            margin: 0 12px;
        }
    `

    const LoadFileName = styled.div`
        ${breadcrumbsIcon}
    `

    const CurrentChunkNumber = styled.div`
        ${breadcrumbsIcon}
    `

    return (
        <>
            <HeaderWrapper>
                Data prep tools
            </HeaderWrapper>
            <Breadcrumbs>
                <HeaderTitle>
                    Edit features
                </HeaderTitle>
                {loadFilename && (
                    <>
                        <LoadFileName>
                            {loadFilename}
                        </LoadFileName>
                        <CurrentChunkNumber>
                            {currentChunkNumber}
                        </CurrentChunkNumber>
                    </>
                )}
            </Breadcrumbs>
        </>
    )
}