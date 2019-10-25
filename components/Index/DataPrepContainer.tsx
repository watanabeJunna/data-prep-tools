import {
    useRef,
    useState,
    Dispatch,
    SetStateAction,
    FC,
    MutableRefObject,
    ChangeEvent,
    KeyboardEvent
} from 'react'
import styled, { StyledComponent } from 'styled-components'
import { ExportDataComponent, LoadDataComponent, AddDimensionComponent } from './index'
import { InputStyle } from '../Input'

export const DataPrepContainer: FC = () => {
    type Vector = string[][]

    const [vector, setVector]: [
        Vector,
        Dispatch<SetStateAction<Vector>>
    ] = useState<Vector>([])

    const convertVectorIntoComponent = (vector: Vector) => {
        if (vector.length === 0) {
            return
        }

        const copyVector: Vector = [...vector]

        const columns: string[] = [...copyVector.shift() as string[]]
        const rows: Vector = copyVector.map((v: string[]) => [...v])

        columns.unshift('ID')

        rows.forEach((row: string[], c: number): void => {
            row.unshift((c + 1).toString())
        })

        const columnElement = columns.map((column: string, c: number): JSX.Element => {
            return (
                <ColumnCell key={c}>
                    {column}
                </ColumnCell>
            )
        })

        const rowElement = rows.map((row: string[], rowNum: number): JSX.Element => {
            return (
                <Row key={rowNum}>
                    {
                        row.map((feature: string, columnNum: number): JSX.Element => {
                            return (
                                <RowCell
                                    key={columnNum}
                                    text={feature}
                                    column={columnNum - 1}
                                    row={rowNum + 1}
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
        color: #777777;
        font-family: 'Raleway', sans-serif;
        max-height: 620px;
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
        padding: 22px;
        margin: auto 0;
    `

    const Row: StyledComponent<'div', {}> = styled.div`
        display: flex;
        padding: 0 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    interface ICell {
        text: string
        column: number
        row: number
    }

    const RowCell: FC<ICell> = ({ column, row, text }) => {
        const [selected, setSelected]: [
            boolean,
            Dispatch<SetStateAction<boolean>>
        ] = useState<boolean>(false)

        const [value, setValue]: [
            string,
            Dispatch<SetStateAction<string>>
        ] = useState<string>('')

        const ref: MutableRefObject<HTMLInputElement | null> = useRef(null)

        const handleDoubleClick = (): void => {
            setSelected(!selected)

            // if (value !== vector[row][column]) {
            //     setVector((vector: Vector) => {
            //         let newVector: Vector = [...vector]

            //         newVector[row][column] = value

            //         return newVector
            //     })
            // }
        }

        const handleInputBlur = (): void => {
            setVector((vector: Vector) => {
                let newVector: Vector = [...vector]

                newVector[row][column] = value

                return newVector
            })
        }

        const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
            setValue(e.target.value)
        }

        const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
            if (!ref.current) {
                throw new Error('No reference to data input')
            }

            if (e.key === 'Enter') {
                handleDoubleClick()
            }
        }

        const CellStyle: StyledComponent<'div', {}> = styled.div`
            width: 22%;
            padding: 22px;
            margin: auto 0;
        `

        const InputCell: StyledComponent<'div', {}> = styled.div`
            margin: auto 22px;
            width: 22%;
        `

        const DataInput: StyledComponent<'input', {}> = styled.input`
            ${InputStyle}
            color: #777777;
            font-size: 1.1em;
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
                    onDoubleClick={() => handleDoubleClick()}
                    onBlur={() => handleInputBlur()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                />
            </InputCell> :
            <CellStyle
                onDoubleClick={() => handleDoubleClick()}
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
            <DataContent>
                {convertVectorIntoComponent(vector)}
            </DataContent>
        </Wrapper>
    )
}