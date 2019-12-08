import styled, { css } from 'styled-components'
import { RootState } from '../../../store/reducer'
import { setCurrentChunkNumber } from '../../../store/currentChunkNumber/actions'
import { useSelector, useDispatch } from 'react-redux'

export default () => {
    const chunkLength = useSelector(({ chunkLength }: RootState) => chunkLength.chunkLength)
    const dispatch = useDispatch()

    const Pagination = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 48px;
        text-align: center;
        margin: 0 auto;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const ItemBase = css`
        color: #00aafc;
        padding: 0px 12px;
        font-size: 1.4em;
        font-family: "Yu Gothic";
        font-weight: 400;
        opacity: 0.7;
        transition: .3s;
        &:hover {
            opacity: 1;
        }
    `

    const PaginationItemNumber = styled.div`
        ${ItemBase}
    `

    const AdjacentControllButton = styled.div`
        ${ItemBase}
    `

    const makePaginationItems = (chunkLength: number): JSX.Element[] => {
        const items = [...Array(chunkLength)].map((_, c) => {
            return (
                <PaginationItemNumber
                        key={c}
                        onClick={() => {
                            dispatch(setCurrentChunkNumber(c))
                        }}
                    >
                        <p>{c}</p>
                </PaginationItemNumber>
            )
        })
        return items
    }

    return (
        <>
            {chunkLength !== 0 && (
                <Pagination>
                    <AdjacentControllButton>
                        <p>prev</p>
                    </AdjacentControllButton>
                    {makePaginationItems(chunkLength)}
                    <AdjacentControllButton>
                        <p>next</p>
                    </AdjacentControllButton>
                </Pagination>
            )}
        </>
    )
}