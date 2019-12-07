import { useSelector } from 'react-redux'
import styled, { css, StyledComponent } from 'styled-components'
import OperationContent from './OperationContent'
import { RootState } from '../../../store/reducer'

export default () => {
    const [currentChunkNumber, loadFilename] =
        useSelector((state: RootState) => {
            return [
                state.currentChunkNumber.currentChunkNumber,
                state.loadFilename.loadFilename
            ]
        })

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

    // must be ::before
    const breadcrumbsIcon = css`
        :after {
            content: '>';
            font-size: 0.85em;
            font-family: 'Raleway', Arial, sans-serif;
            font-weight: 100;
            margin: 0 12px;
        }
    `

    interface IsExistHeaderTitle { 
        isExist: boolean
    }

    const HeaderTitle: StyledComponent<'div', {}, IsExistHeaderTitle> = styled.div<IsExistHeaderTitle>`
        ${({ isExist }) => (isExist && breadcrumbsIcon)}
    `

    const LoadFileName = styled.div`
        margin: auto 7px;
        ${breadcrumbsIcon}
    `

    const CurrentChunkNumber = styled.div``

    return (
        <Header>
            <HeaderTextContent>
                <HeaderTitle
                    isExist={loadFilename !== ''}
                >
                    Add features
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
            </HeaderTextContent>
            <OperationContent />
        </Header>
    )
}