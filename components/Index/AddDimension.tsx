import {
    useState,
    useRef,
    FC,
    Dispatch,
    SetStateAction,
    MutableRefObject
} from 'react'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import { Vector } from './DataPrepContainer'
import { VectorItemStorage } from "./VectorItemStorage"

export interface IAddDimensionComponent {
    vector: string[][]
    setVector: (item: string[][]) => void
}

const vectorItemStorage = new VectorItemStorage()

export const AddDimensionComponent: FC<IAddDimensionComponent> = ({
    vector,
    setVector,
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

        // Set Vector
        const vectorCopy: Vector = [...vector]
        const newVector: Vector = []

        newVector.push([...vectorCopy.shift() as string[], dim])
        vectorCopy.map(v => newVector.push([...v, '']))

        setClose(true)
        setVector(newVector)

        // Set Storage
        const itemLength = vectorItemStorage.getItemLength();

        [...Array(itemLength)].forEach((_: [undefined], c: number) => {
            const items: Vector = vectorItemStorage.getItem(c)

            const newItem: Vector = []
            newItem.push([...items.shift() as string[], dim])
            items.forEach((item: string[]) => newItem.push([...item, '']))

            vectorItemStorage.setItem(c, newItem)
        })
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