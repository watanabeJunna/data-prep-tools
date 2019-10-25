import {
    useState,
    useRef,
    FC,
    Dispatch,
    SetStateAction,
    MutableRefObject
} from 'react'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import fetch from 'isomorphic-fetch'

export interface ILoadDataComponent {
    setVector: (item: string[][]) => void
}

export const LoadDataComponent: FC<ILoadDataComponent> = ({
    setVector
}) => {
    const [close, setClose]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const fileNameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

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

        setClose(true)

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
            setClose={setClose}
        >
            <DialogInput
                ref={fileNameInputRef}
                placeholder='File name'
                defaultValue='data/prod.csv'
            />
            <DialogSubmitButton
                onClick={onSubmit}
            >
                <p>Submit</p>
            </DialogSubmitButton>
        </DialogUtilComponent>
    )
}