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
import { LoadDataComponent, AddDimensionComponent } from './index'
import { InputStyle } from '../Input'

export const DataPrepContainer: FC = () => {
    type Vector = string[][] | null

    const [vector, setVector]: [
        Vector,
        Dispatch<SetStateAction<Vector>>
    ] = useState<Vector>(null)

    const convertVectorIntoComponent = (vector: string[][] | null) => {
        if (!vector) {
            return
        }

        const copyVector: string[][] = [...vector]

        const columns: string[] = copyVector.shift() as string[]
        const rows: string[][] = copyVector

        if (columns[0] !== 'ID') {
            columns.unshift('ID')

            for (let i = 0; i < rows.length; i++) {
                rows[i].unshift((i + 1).toString())
            }
        }

        let columnElement: JSX.Element[]
        let rowElement: JSX.Element[]

        columnElement = columns.map((column: string, c: number) => {
            return (
                <Cell
                    key={c}
                    text={column}
                />
            )
        })

        rowElement = rows.map((row: string[], c: number) => {
            return (
                <Row key={c}>
                    {
                        row.map((feature: string, c: number) => {
                            return (
                                <Cell
                                    key={c}
                                    text={feature}
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

    const Wrapper = styled.div`
        font-family: ${props => props.theme.fontFamily};
        font-weight: 400;
        box-shadow: 0px 1px 4px rgb(176, 176, 176);
        padding: 25px 0;
    `

    const Header = styled.div`
        display: flex;
        justify-content: space-between;
        position: relative;
        padding: 24px 48px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const HeaderTitle = styled.div`
        font-size: 1.5em;
        color: #5f6f81;
        margin: auto 0;
    `

    const ButtonTable = styled.div`
        display: flex;
    `

    const DataContent = styled.div`
        color: #777777;
        font-family: 'Raleway', sans-serif;
        max-height: 620px;
        overflow: auto;
    `

    const Column = styled.div`
        display: flex;
        font-weight: 900;
        padding: 12px 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const Row = styled.div`
        display: flex;
        padding: 0 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const CellStyle = styled.div`
        width: 22%;
        padding: 22px;
        margin: auto 0;
    `

    const InputCell = styled.div`
        margin: auto 22px;
        width: 22%;
    `

    const DataInput = styled.input`
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

    const Cell: FC<{
        key?: number
        text: string
    }> = ({ key = 0, text }) => {
        const [selected, setSelected]: [
            boolean,
            Dispatch<SetStateAction<boolean>>
        ] = useState<boolean>(false)

        const [value, setValue]: [
            string,
            Dispatch<SetStateAction<string>>
        ] = useState<string>('')

        const ref: MutableRefObject<HTMLInputElement | null> = useRef(null)

        const handleDoubleClick = () => {
            setSelected(!selected)
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

        const element = selected ?
            <InputCell>
                <DataInput
                    ref={ref}
                    key={key}
                    autoFocus={true}
                    onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => handleInputKeyPress(e)}
                    onDoubleClick={handleDoubleClick}
                    defaultValue={value ? value : text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                />
            </InputCell> :
            <CellStyle
                key={key}
                onDoubleClick={handleDoubleClick}
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
                <ButtonTable>
                    <LoadDataComponent
                        setVector={setVector}
                    />
                    <AddDimensionComponent
                        vector={vector}
                        setVector={setVector}
                    />
                </ButtonTable>
            </Header>
            <DataContent>
                {convertVectorIntoComponent(vector)}
            </DataContent>
        </Wrapper>
    )
}