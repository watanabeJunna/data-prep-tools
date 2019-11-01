import {
    useState,
    useRef,
    FC,
    Dispatch,
    SetStateAction,
    MutableRefObject
} from 'react'
import fetch from 'isomorphic-fetch'
import { Vector } from './DataPrepContainer'
import { VectorItemStorage } from './VectorItemStorage'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'


export interface IExportDataComponent {
    vector: string[][]
}

export const ExportDataComponent: FC<IExportDataComponent> = ({
    vector
}) => {
    const [close, setClose]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const fileNameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const exportData = async (): Promise<void> => {
        if (!fileNameInputRef.current) {
            throw new Error('No reference to file name input')
        }

        if (!fileNameInputRef.current.value) {
            return
        }

        const vectorItemStorage = new VectorItemStorage()
        const itemLength: number = vectorItemStorage.getItemLength()
        const exportVector: Vector = [];

        [...Array(itemLength)].map((_: [undefined], c: number) => {
            const item = vectorItemStorage.getItem(c)

            // Remove columns other than first data
            if (itemLength !== 0) {
                item.shift()
            }

            exportVector.push(...item)
        })

        const fileName: string = fileNameInputRef.current.value

        const res: Response = await fetch('/api/v1/vector', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileName: fileName,
                vector: exportVector
            })
        })

        if (res.status !== 200) {
            return
        }

        setClose(true)
    }

    return (
        <DialogUtilComponent
            showButtonColor='#ab55aa'
            showButtonText='Export data'
            close={close}
            setClose={setClose}
        >
            <DialogInput
                placeholder='File name'
                ref={fileNameInputRef}
            />
            <DialogSubmitButton
                onClick={exportData}
            >
                <p>Export</p>
            </DialogSubmitButton>
        </DialogUtilComponent>
    )
}