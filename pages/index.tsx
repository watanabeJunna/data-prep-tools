import {
    useRef,
    useState,
    Dispatch,
    SetStateAction,
    FC,
    MutableRefObject
} from 'react'
import styled, { StyledComponent } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { DialogUtilComponent, DialogSubmitButton, createDialogInput } from '../components/Dialog'
import fetch from 'isomorphic-fetch'

export default () => {
    const GlobalStyle = createGlobalStyle`
        ${reset}
        body, html {
            font-size: 1.1em;
            margin: 30px 0;
        }
    `

    return (
        <>
            <GlobalStyle />
            <Container>
                <Header />
            </Container>
            <Container>
                <DataPrepContainer />
            </Container>
        </>
    )
}

const DataPrepContainer: FC = () => {
    type Vector = string[][] | null

    const [vector, setVector]: [
        Vector,
        Dispatch<SetStateAction<Vector>>
    ] = useState<Vector>(null)

    const vectorMachining = (vector: string[][] | null) => {
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

        let columnElement: JSX.Element[] | null = null
        let rowElement: JSX.Element[] | null = null

        columnElement = columns.map((column, c) => {
            return (
                <ColumnCell key={c}>
                    {column}
                </ColumnCell>
            )
        })

        rowElement = rows.map((row, c) => {
            return (
                <Row key={c}>
                    {
                        row.map((feature, c) => {
                            return (
                                <ColumnCell key={c}>
                                    {feature}
                                </ColumnCell>
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

    const ColumnCell = styled.div`
        width: 22%;
        padding: 22px;
        margin: auto 0;
    `

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
                    <AddDimComponent
                        vector={vector}
                        setVector={setVector}
                    />
                </ButtonTable>
            </Header>
            <DataContent>
                {vectorMachining(vector)}
            </DataContent>
        </Wrapper>
    )
}

interface IDataOperationComponent {
    setVector: (item: string[][]) => void
}

const LoadDataComponent: FC<IDataOperationComponent> = ({
    setVector
}) => {
    const [close, setClose]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const fileNameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const FileNameInput: StyledComponent<'input', any, any> = createDialogInput({
        placeholder: 'File name'
    })

    const checkVector = (vectors: string[][]): boolean => {
        let isValid: boolean = true

        const dim: number = vectors[0].length

        vectors.forEach(vector => {
            if (vector.length !== dim) {
                isValid = false
            }

            vector.forEach(feature => {
                if (!feature) {
                    isValid = false
                }
            })
        })

        return isValid
    }

    const onSubmit = async (): Promise<void> => {
        if (!fileNameInputRef.current) {
            throw new Error('No reference to file name input')
        }

        if (!fileNameInputRef.current.value) {
            return
        }

        const fileName: string = fileNameInputRef.current.value;

        const res: Response = await fetch('/api/v1/vector', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName: fileName })
        })

        if (res.status !== 200) {
            return
        }

        const datas: string[] = await res.json()

        const vector: string[][] = datas.map(data => data.split(','))

        setClose(false)

        if (!checkVector(vector)) {
            throw new Error('Invalid data')
        }

        setVector(vector)
    }

    return (
        <DialogUtilComponent
            showButtonColor='#00aeea'
            showButtonText='Load features'
            close={close}
        >
            <FileNameInput
                ref={fileNameInputRef}
            />
            <DialogSubmitButton
                onClick={onSubmit}
            >
                <p>Submit</p>
            </DialogSubmitButton>
        </DialogUtilComponent>
    )
}

interface IAddDimComponent {
    vector: string[][] | null
    setVector: (item: string[][]) => void
}

const AddDimComponent: FC<IAddDimComponent> = ({
    vector,
    setVector
}) => {
    const [close, setClose]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const dimInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const DimInput: StyledComponent<'input', any, any> = createDialogInput({
        placeholder: 'dimension name'
    })

    const onSubmit = async (): Promise<void> => {
        if (!dimInputRef.current) {
            throw new Error('No reference to file name input')
        }

        if (!dimInputRef.current.value) {
            return
        }

        const dim: string = dimInputRef.current.value

        if (!vector) {
            return
        }

        if (!dim) {
            return
        }

        const vectorCopy = [...vector]
        const newVector: string[][] = []

        newVector.push([...vectorCopy.shift() as string[], dim])

        vectorCopy.map(v => newVector.push([...v, ""]))

        setClose(false)
        setVector(newVector)
    }

    return (
        <DialogUtilComponent
            showButtonColor='#00abaa'
            showButtonText='Add dimension'
            close={close}
        >
            <DimInput
                ref={dimInputRef}
            />
            <DialogSubmitButton
                onClick={onSubmit}
            >
                <p>Submit</p>
            </DialogSubmitButton>
        </DialogUtilComponent>
    )
}