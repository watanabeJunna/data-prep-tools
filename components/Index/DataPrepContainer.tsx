import {
    useEffect,
    useRef,
    useState,
    Dispatch,
    SetStateAction,
    UIEvent,
    FC,
    MutableRefObject,
    ChangeEvent,
    KeyboardEvent
} from 'react'
import styled, { StyledComponent } from 'styled-components'
import { ExportDataComponent, LoadDataComponent, AddDimensionComponent } from './index'
import { InputStyle } from '../Input'
import { ViewState } from './classes'

const viewState = new ViewState()

export const DataPrepContainer: FC = () => {
    type Vector = string[][]

    const [vector, setVector]: [
        Vector,
        Dispatch<SetStateAction<Vector>>
    ] = useState<Vector>([])

    const dataContentRef: MutableRefObject<HTMLDivElement | null> = useRef(null)

    useEffect(() => {
        if (!dataContentRef.current) {
            throw new Error('No reference to Data content')
        }

        dataContentRef.current.scrollTo(0, viewState.getScrollTop())
    })

    const convertVectorIntoComponent = (vector: Vector) => {
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
                {rowElement}
            </>
        )
    }

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

    const HeaderTitle: StyledComponent<'div', {}> = styled.div`
        font-size: 1.5em;
        color: #5f6f81;
        margin: auto 0;
    `

    const OperationTable: StyledComponent<'div', {}> = styled.div`
        display: flex;
    `

    const DataContent: StyledComponent<'div', {}> = styled.div`
        max-height: 620px;
        color: #777777;
        font-family: "Yu Gothic";
        overflow: auto;
    `

    const Column: StyledComponent<'div', {}> = styled.div`
        display: flex;
        font-weight: 900;
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

    const RowCell: FC<IRowCell> = ({ column, row, text }) => {
        const [selected, setSelected]: [
            boolean,
            Dispatch<SetStateAction<boolean>>
        ] = useState<boolean>(false)

        const [value, setValue]: [
            string,
            Dispatch<SetStateAction<string>>
        ] = useState<string>('')

        const ref: MutableRefObject<HTMLInputElement | null> = useRef(null)

        const toggleElement = (): void => {
            setSelected(!selected)

            if (value !== "" && value !== vector[row][column]) {
                setVector((vector: Vector) => {
                    let newVector: Vector = [...vector]

                    newVector[row][column] = value

                    return newVector
                })
            }
        }

        const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
            setValue(e.target.value)
        }

        const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
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
            padding: 22px;
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
                    onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => handleInputKeyPress(e)}
                    onDoubleClick={() => toggleElement()}
                    onBlur={() => toggleElement()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                />
            </InputCell> :
            <CellStyle
                onDoubleClick={() => toggleElement()}
            >
                {value ? value : text}
            </CellStyle>

        return element
    }

    return (
        <Wrapper>
            <Header>
                <HeaderTitle>
                    Add features
                </HeaderTitle>
                <OperationTable>
                    <LoadDataComponent
                        setVector={setVector}
                    />
                    <AddDimensionComponent
                        vector={vector}
                        setVector={setVector}
                    />
                    <ExportDataComponent
                        vector={vector}
                    />
                </OperationTable>
            </Header>
            <DataContent
                ref={dataContentRef}
                onScroll={() => {
                    if (!dataContentRef.current) {
                        throw new Error('No reference to Data content')
                    }

                    viewState.setScrollTop(dataContentRef.current.scrollTop)
                }}
            >
                {convertVectorIntoComponent(vector)}
            </DataContent>
        </Wrapper>
    )
}