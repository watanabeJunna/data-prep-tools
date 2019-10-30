import {
    useState,
    useRef,
    FC,
    Dispatch,
    SetStateAction,
    MutableRefObject
} from 'react'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import { VectorItemStorage } from "./VectorItemStorage";

export interface IAddDimensionComponent {
    vector: string[][]
    setVector: (item: string[][]) => void
}

const vectorItemStorage = new VectorItemStorage()

export const AddDimensionComponent: FC<IAddDimensionComponent> = ({
    vector,
    setVector
}) => {
    const [close, setClose]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const dimInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const onSubmit = (): void => {
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

        const flatten = (xs: any) => xs.reduce(
            (acc: any, e: any) => Array.isArray(e) ? acc.concat(flatten(e))
                : acc.concat(e)
            , []
        )

        const item = vectorItemStorage.getItem(1)

        const vectorCopy: string[][] = [...vector]
        const newVector: string[][] = []

        newVector.push([...vectorCopy.shift() as string[], dim])

        vectorCopy.map(v => newVector.push([...v, ""]))

        setClose(true)
        setVector(newVector)
    }

    return (
        <DialogUtilComponent
            showButtonColor='#00abaa'
            showButtonText='Add dimension'
            close={close}
            setClose={setClose}
        >
            <DialogInput
                placeholder='dimension name'
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