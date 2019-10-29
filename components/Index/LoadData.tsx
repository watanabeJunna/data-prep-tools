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
import { Vector } from './DataPrepContainer'

export interface ILoadDataComponent {
    setVector: (item: Vector) => void
    setLoadFileName: (fileName: string) => void
    setCurrentDataNumber: (currentDataNumber: number) => void
    setItemLength: (currentDataNumber: number) => void
}

export const LoadDataComponent: FC<ILoadDataComponent> = ({
    setVector,
    setLoadFileName,
    setCurrentDataNumber,
    setItemLength,
}) => {
    const [close, setClose]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const fileNameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const checkVector = (vectors: Vector): boolean => {
        let isValid: boolean = true

        const dim: number = vectors[0].length

        vectors.forEach(vector => {
            if (vector.length !== dim) {
                isValid = false
            }
        })

        return isValid
    }

    /**
     * If the number of vectors is enormous,
     * divide the vectors and save them in storage.
     * 
     * @param vector Set of features.
     * @param threshold Number of divisions.
     */
    const splitAndSaveVector = (vector: Vector, threshold: number): Vector => {
        if (vector.length < 100) {
            return vector
        }

        let itemLength = 0

        for (let i = 0; i < vector.length; i += threshold, itemLength++) {
            const vectorJsonStr: string = JSON.stringify(vector.slice(i, i + threshold))

            window.localStorage.setItem(('vector.' + itemLength), vectorJsonStr)
        }

        window.localStorage.setItem('item_length', itemLength.toString())

        setItemLength(itemLength)

        return vector.slice(0, threshold)
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
        const vector: Vector = datas.map(data => data.replace(/[\r\n]/g, '').split(','))

        setClose(true)

        if (!checkVector(vector)) {
            throw new Error('Invalid data')
        }

        const editableNumber = 100

        const splitVectorArray: Vector = splitAndSaveVector(vector, editableNumber)

        setCurrentDataNumber(0)
        setVector(splitVectorArray)
        setLoadFileName(fileName)
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