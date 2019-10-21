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

        const fileName: string = fileNameInputRef.current.value

        const res: Response = await fetch('/api/v1/vector', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileName: fileName,
                vector: vector
            })
        })

        if (res.status !== 200) {
            return
        }

        setClose(false)
    }

    return (
        <DialogUtilComponent
            showButtonColor='#ab55aa'
            showButtonText='Export data'
            close={close}
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
        </DialogUtilComponent >
    )
}