import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css, StyledComponent, FlattenSimpleInterpolation } from 'styled-components'
import { ExportDataComponent, LoadDataComponent, AddDimensionComponent } from './index'
import { InputStyle } from '../Input'
import { RootState } from '../../store/reducer'

export const DataPrep: React.FC = () => {
    const [features, columns] = useSelector(({ features, columns }: RootState) => {
        return [features.features, columns.columns,]
    })

    const dataContentRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

    /**
     * The vector to be rendered must consist of header row + body row.
     * 
     * @param vector 
     * @returns
     */
    const convertFearureIntoComponent = (): JSX.Element | undefined => {
        if (vector.length === 0) {
            return
        }

        const copyVector: Vector = [...vector]

        const columns: string[] = [...copyVector.shift() as string[]]
        const rows: Vector = copyVector.map((v: string[]) => [...v])

        const columnElement: JSX.Element[] = [
            <IDCell>
                ID
            </IDCell>
        ]

        columns.forEach((column: string, c: number): void => {
            columnElement.push(
                <ColumnCell key={c}>
                    {column}
                </ColumnCell>
            )
        })

        const rowElement: JSX.Element[] = rows.map((row: string[], rowNum: number): JSX.Element => {
            return (
                <Row key={rowNum}>
                    {
                        <IDCell key={rowNum}>
                            {rowNum + 1}
                        </IDCell>
                    }
                    {
                        row.map((feature: string, columnNum: number): JSX.Element => {
                            return (
                                <RowCell
                                    key={columnNum}
                                    text={feature}
                                    column={columnNum}
                                    row={rowNum + 1} // Consider header
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
                    {columnElement}
                </Column>
                <DataContent>
                    {rowElement}
                </DataContent>
            </>
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

            // const scrollTop: number = viewState.getScrollTop()
            // dataContentRef.current.scrollTop = scrollTop
        }, [dataContentRef])


        return (
            <Style
                ref={dataContentRef}
                onScroll={() => {
                    if (!dataContentRef.current) {
                        throw new Error('No reference to Data content')
                    }

                    // viewState.setScrollTop(dataContentRef.current.scrollTop)
                }}
            >
                {children}
            </Style>
        )
    }

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
        column: number
        row: number
    }

    const RowCell: React.FC<IRowCell> = ({ column, row, text }) => {
        const [selected, setSelected]: [
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>
        ] = useState<boolean>(false)

        const [value, setValue]: [
            string,
            React.Dispatch<React.SetStateAction<string>>
        ] = useState<string>('')

        const ref: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

        const toggleElement = (): void => {
            setSelected(!selected)

            if (value !== "" && value !== vector[row][column]) {
                let newVector: Vector = [...vector]
                newVector[row][column] = value

                const currentDataNumber: number = vectorItemState.getCurrentDataNumber()
                vectorItemStorage.setItem(currentDataNumber, newVector)
                setVector(newVector)
            }
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
            setValue(e.target.value)
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

        const element = selected ?
            <InputCell>
                <DataInput
                    ref={ref}
                    autoFocus={true}
                    defaultValue={value ? value : text}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleInputKeyPress(e)}
                    onClick={() => toggleElement()}
                    onBlur={() => toggleElement()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                />
            </InputCell> :
            <CellStyle
                onClick={() => toggleElement()}
            >
                {value ? value : text}
            </CellStyle>

        return element
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
                    <LoadDataComponent
                    // setVector={setVector}
                    // setLoadFileName={setLoadFileName}
                    // setCurrentDataNumber={(dataNumber: number) => vectorItemState.setCurrentDataNumber(dataNumber)}
                    // setItemLength={(itemLength: number) => vectorItemState.setItemLength(itemLength)}
                    />
                    <AddDimensionComponent />
                    {/* <ExportDataComponent
                        vector={vector}
                    /> */}
                </OperationTable>
            </Header>
            {convertFearureIntoComponent(vector)}
            {/* {convertDataNumberToComponent(vectorItemState.getItemLength())} */}
        </Wrapper>
    )
}