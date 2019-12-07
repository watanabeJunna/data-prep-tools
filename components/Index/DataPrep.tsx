import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css, StyledComponent } from 'styled-components'
import { ExportDataComponent, LoadDataComponent, AddDimensionComponent } from './index'
import { InputStyle } from '../Input'
import { RootState } from '../../store/reducer'
import { FeatureValue } from '../../interfaces'
import { updateScalar } from '../../store/features/actions'
import { setCurrentChunkNumber } from '../../store/currentChunkNumber/actions'

export const DataPrep: React.FC = () => {
    const [columns, currentDataNumber, features, chunkLength, loadFilename] =
        useSelector((state: RootState) => {
            return [
                state.columns.columns,
                state.currentDataNumber.currentChunkNumber,
                state.features.features,
                state.chunkLength.chunkLength,
                state.loadFilename.loadFilename
            ]
        })
    const scrollTopRef = useRef<number>(0)
    const dataContentRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useDispatch()

    /**
     * Converts a scalar held in a state to a component.
     * 
     * @returns The converted scalar component or undefined.
     */
    const convertScalarIntoComponent = (): JSX.Element | undefined => {
        if (!features.size) {
            return
        }

        const columnElements = [
            <IDCell key={columns.length}>
                ID
            </IDCell>,
            ...columns.map((column: string, index: number) => {
                return (
                    <ColumnCell key={index}>
                        {column}
                    </ColumnCell>
                )
            })
        ]

        const features_ = features.get(currentDataNumber) as FeatureValue
        const featureElements = features_.map((feature, rowNumber) => {
            return (
                <Row key={rowNumber}>
                    <IDCell key={rowNumber}>
                        {rowNumber + 1}
                    </IDCell>
                    {
                        feature.map((scalar, columnNumber) => {
                            return (
                                <RowCell
                                    key={columnNumber}
                                    text={scalar}
                                    dataNumber={currentDataNumber}
                                    columnNumber={columnNumber}
                                    rowNumber={rowNumber}
                                />
                            )
                        })
                    }
                </Row>
            )
        })

        return (
            <>
                <Column>
                    {columnElements}
                </Column>
                <DataContent>
                    {featureElements}
                </DataContent>
            </>
        )
    }

    const DataContent: React.FC = ({ children }) => {
        const Style = styled.div`
            max-height: 620px;
            color: #777777;
            font-family: "Yu Gothic";
            overflow: auto;
            border-bottom: 1px solid rgba(176, 176, 176, 0.5);
        `

        useEffect((): void => {
            if (!dataContentRef.current) {
                return
            }
            dataContentRef.current.scrollTop = scrollTopRef.current
        }, [dataContentRef])

        return (
            <Style
                ref={dataContentRef}
                onScroll={() => {
                    if (!dataContentRef.current) {
                        throw new Error('No reference to Data content')
                    }

                    scrollTopRef.current = dataContentRef.current.scrollTop
                }}
            >
                {children}
            </Style>
        )
    }

    /**
     * Converts a chunk number held in a state to a component.
     * 
     * @returns The converted chunk number component or undefined.
     */
    const convertChunkNumberIntoComponent = (): JSX.Element | undefined => {
        if (!chunkLength) {
            return
        }

        const handleClick = (dataNumber: number): void => {
            scrollTopRef.current = 0
            dispatch(setCurrentChunkNumber(dataNumber))
        }

        const items = [...Array(chunkLength)].map((_, c) => {
            return (
                <DataIndexButton
                    key={c}
                    onClick={() => handleClick(c)}
                >
                    <p>{c}</p>
                </DataIndexButton>
            )
        })

        return (
            <ItemSelector>
                <AdjacentControllButton>
                    <p>prev</p>
                </AdjacentControllButton>
                {items}
                <AdjacentControllButton>
                    <p>next</p>
                </AdjacentControllButton>
            </ItemSelector>
        )
    }

    const Wrapper = styled.div`
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        box-shadow: 0px 1px 4px rgb(176, 176, 176);
        padding: 25px 0;
    `

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

    const CurrentDataNumber = styled.div``

    const OperationTable = styled.div`
        display: flex;
    `

    const Column = styled.div`
        display: flex;
        font-weight: 900;
        color: #777777;
        font-family: "Yu Gothic";
        padding: 12px 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const ColumnCell = styled.div`
        width: 22%;
        overflow: hidden;
        padding: 22px;
        margin: auto 0;
    `

    const Row = styled.div`
        display: flex;
        padding: 0 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
        &:hover {
            background-color: rgb(244, 246, 249);
        }
    `

    const IDCell = styled.div`
        width: 10%;
        padding: 22px;
        margin: auto 0;
    `

    interface IRowCell {
        text: string
        dataNumber: number
        rowNumber: number
        columnNumber: number
    }

    const RowCell: React.FC<IRowCell> = ({ dataNumber, columnNumber, rowNumber, text }) => {
        const [selected, setSelected] = useState<boolean>(false)
        const inputRef = useRef<HTMLInputElement | null>(null)
        const inputValueRef = useRef<string>('')

        /**
         * Perform element toggle and scalar update.
         */
        const handleSelectEvent = (): void => {
            setSelected(!selected)

            if (inputValueRef.current && inputValueRef.current !== text) {
                dispatch(updateScalar(dataNumber, columnNumber, rowNumber, inputValueRef.current))
            }
        }

        /**
         * If a specific key is pressed, call handleSelectEvent
         * 
         * @param e The KeyboardEvent.
         */
        const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
            if (!inputRef.current) {
                throw new Error('No reference to data input')
            }

            if (e.key === 'Enter') {
                handleSelectEvent()
            }
        }

        const CellStyle = styled.div`
            width: 22%;
            height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding: 22px;
            margin: auto 0;
            transition: .3s;
            &:hover {
                color: #03b1b6fa;
                background-color: #03b1b611;
            }
        `

        const InputCell = styled.div`
            width: 22%;
            padding: 11px 22px;
            margin: auto 0;
        `

        const DataInput = styled.input`
            ${InputStyle}
            width: 100%;
            color: #777777;
            font-size: 1.0em;
            font-family: "Yu Gothic";
            font-weight: 400;
            padding: 0px;
            margin: 0px;
            border-bottom: 2px solid #dee7ec;
            &:focus {
                border-bottom: 2px solid #228aff;
            }
        `

        return selected ? (
            <InputCell>
                <DataInput
                    ref={inputRef}
                    autoFocus={true}
                    defaultValue={inputValueRef.current ? inputValueRef.current : text}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleInputKeyPress(e)}
                    onClick={() => handleSelectEvent()}
                    onBlur={() => handleSelectEvent()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputValueRef.current = e.target.value}
                />
            </InputCell>
        ) : (
                <CellStyle
                    onClick={() => handleSelectEvent()}
                >
                    {inputValueRef.current ? inputValueRef.current : text}
                </CellStyle>
            )
    }

    const ItemSelector = styled.div`
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

    const DataIndexButton = styled.div`
        ${ItemBase}
    `

    const AdjacentControllButton = styled.div`
        ${ItemBase}
    `

    return (
        <Wrapper>
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
                        </>
                    )}
                    {chunkLength !== 0 && 
                            <CurrentDataNumber>
                                {currentDataNumber}
                            </CurrentDataNumber>}
                </HeaderTextContent>
                <OperationTable>
                    <LoadDataComponent />
                    <AddDimensionComponent />
                    <ExportDataComponent />
                </OperationTable>
            </Header>
            {convertScalarIntoComponent()}
            {convertChunkNumberIntoComponent()}
        </Wrapper>
    )
}