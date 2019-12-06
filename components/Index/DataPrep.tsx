import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css, StyledComponent, FlattenSimpleInterpolation } from 'styled-components'
import { ExportDataComponent, LoadDataComponent, AddDimensionComponent } from './index'
import { InputStyle } from '../Input'
import { RootState } from '../../store/reducer'
import { FeatureValue, Features } from '../../interfaces'
import { updateScalar } from '../../store/features/actions'

export const DataPrep: React.FC = () => {
    const [features, columns, currentDataNumber, loadFilename] =
        useSelector((state: RootState) => {
            return [
                state.features.features,
                state.columns.columns,
                state.currentDataNumber.currentDataNumber,
                state.loadFilename.loadFilename
            ]
        })

    const scrollTopRef: React.MutableRefObject<number> = useRef(0)
    const dataContentRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
    const dispatch: React.Dispatch<any> = useDispatch()

    /**
     * @returns
     */
    const convertFearureIntoComponent = (): JSX.Element | undefined => {
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
        const featureElements = features_.map((feature: string[], rowNumber: number) => {
            return (
                <Row key={rowNumber}>
                    <IDCell key={rowNumber}>
                        {rowNumber + 1}
                    </IDCell>
                    {
                        feature.map((scalar: string, columnNumber: number) => {
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
        const Style: StyledComponent<'div', {}> = styled.div`
            max-height: 620px;
            color: #777777;
            font-family: "Yu Gothic";
            overflow: auto;
            border-bottom: 1px solid rgba(176, 176, 176, 0.5);
        `

        useEffect(() => {
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

    // const convertDataNumberToComponent = (itemLength: number): JSX.Element | undefined => {
    //     if (!itemLength) {
    //         return
    //     }

    //     const handleItemClick = (dataNumber: number): void => {
    //         const item: Vector = vectorItemStorage.getItem(dataNumber)

    //         viewState.setScrollTop(0)

    //         vectorItemState.setCurrentDataNumber(dataNumber)
    //         setVector(item)
    //     }

    //     const items = [...Array(itemLength)].map((_: [undefined], c: number): JSX.Element => {
    //         return (
    //             <DataIndexButton
    //                 onClick={() => handleItemClick(c)}
    //             >
    //                 <p>{c}</p>
    //             </DataIndexButton>
    //         )
    //     })

    //     return (
    //         <ItemSelector>
    //             <AdjacentControllButton>
    //                 <p>{'prev'}</p>
    //             </AdjacentControllButton>
    //             {items}
    //             <AdjacentControllButton>
    //                 <p>{'next'}</p>
    //             </AdjacentControllButton>
    //         </ItemSelector>
    //     )
    // }

    const Wrapper: StyledComponent<'div', {}> = styled.div`
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        box-shadow: 0px 1px 4px rgb(176, 176, 176);
        padding: 25px 0;
    `

    const Header: StyledComponent<'div', {}> = styled.div`
        display: flex;
        justify-content: space-between;
        position: relative;
        padding: 24px 48px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const HeaderTextContent: StyledComponent<'div', {}> = styled.div`
        display: flex;
        justify-content: flex-start;
        margin: auto 0;
    `

    const HeaderTitle: StyledComponent<'div', {}> = styled.div`
        font-size: 1.5em;
        color: #5f6f81;
        margin: auto 0;
    `

    const LoadFileName: StyledComponent<'div', {}> = styled.div`
        font-size: 1.3em;
        color: #5f6f81;
        margin: auto 7px;
        margin-right: 0px;
        margin-bottom: 2.5px;
        :before {
            content: '>';
            font-weight: 100;
            font-size: 1.3em;
            margin: 0 12px;
        }
    `

    const CurrentDataNumber: StyledComponent<'div', {}> = styled.div`
        font-size: 1.3em;
        color: #5f6f81;
        margin: auto 7px;
        margin-left: 0;
        margin-bottom: 2.5px;
        :before {
            content: '>';
            font-weight: 100;
            font-size: 1.3em;
            margin: 0 12px;
        }
    `

    const OperationTable: StyledComponent<'div', {}> = styled.div`
        display: flex;
    `

    const Column: StyledComponent<'div', {}> = styled.div`
        display: flex;
        font-weight: 900;
        color: #777777;
        font-family: "Yu Gothic";
        padding: 12px 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const ColumnCell: StyledComponent<'div', {}> = styled.div`
        width: 22%;
        overflow: hidden;
        padding: 22px;
        margin: auto 0;
    `

    const Row: StyledComponent<'div', {}> = styled.div`
        display: flex;
        padding: 0 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
        &:hover {
            background-color: rgb(244, 246, 249);
        }
    `

    const IDCell: StyledComponent<'div', {}> = styled.div`
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
        const [selected, setSelected]: [
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>
        ] = useState<boolean>(false)

        const value: React.MutableRefObject<string> = useRef('')

        const ref: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

        const toggleElement = (): void => {
            setSelected(!selected)

            if (value.current && value.current !== text) {
                dispatch(updateScalar(dataNumber, columnNumber, rowNumber, value.current))
            }
        }

        const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
            if (!ref.current) {
                throw new Error('No reference to data input')
            }

            if (e.key === 'Enter') {
                toggleElement()
            }
        }

        const CellStyle: StyledComponent<'div', {}> = styled.div`
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

        const InputCell: StyledComponent<'div', {}> = styled.div`
            width: 22%;
            padding: 11px 22px;
            margin: auto 0;
        `

        const DataInput: StyledComponent<'input', {}> = styled.input`
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
                    ref={ref}
                    autoFocus={true}
                    defaultValue={value.current ? value.current : text}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleInputKeyPress(e)}
                    onClick={() => toggleElement()}
                    onBlur={() => toggleElement()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => value.current = e.target.value}
                />
            </InputCell>
        ) : (
                <CellStyle
                    onClick={() => toggleElement()}
                >
                    {value.current ? value.current : text}
                </CellStyle>
            )
    }

    const ItemSelector: StyledComponent<'div', {}> = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 48px;
        text-align: center;
        margin: 0 auto;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const ItemBase: FlattenSimpleInterpolation = css`
        color: #00aafc;
        padding: 0px 12px;
        font-size: 1.4em;
        font-family: "Yu Gothic";
        font-weight: 400;
        opacity: 0.7;
        trasition: .3s;
        &:hover {
            opacity: 1;
        }
    `

    const DataIndexButton: StyledComponent<'div', {}> = styled.div`
        ${ItemBase}
    `

    const AdjacentControllButton: StyledComponent<'div', {}> = styled.div`
        ${ItemBase}
    `

    return (
        <Wrapper>
            <Header>
                <HeaderTextContent>
                    {/* <HeaderTitle>
                        Add features
                    </HeaderTitle>
                    {loadFileName && (
                        <LoadFileName>
                            {loadFileName}
                        </LoadFileName>
                    )}
                    {
                        (vectorItemState.getItemLength() !== 0) && (
                            <CurrentDataNumber>
                                {vectorItemState.getCurrentDataNumber()}
                            </CurrentDataNumber>
                        )
                    } */}
                </HeaderTextContent>
                <OperationTable>
                    <LoadDataComponent />
                    <AddDimensionComponent />
                    {/* <ExportDataComponent
                        vector={vector}
                    /> */}
                </OperationTable>
            </Header>
            {convertFearureIntoComponent()}
            {/* {convertDataNumberToComponent(vectorItemState.getItemLength())} */}
        </Wrapper>
    )
}