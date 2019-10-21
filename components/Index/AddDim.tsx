import {
    useState,
    useRef,
    FC,
    Dispatch,
    SetStateAction,
    MutableRefObject
} from 'react'
import { StyledComponent } from 'styled-components'
import { DialogUtilComponent, DialogSubmitButton, createDialogInput } from '../Dialog'

export interface IAddDimComponent {
    vector: string[][] | null
    setVector: (item: string[][]) => void
}

export const AddDimComponent: FC<IAddDimComponent> = ({
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