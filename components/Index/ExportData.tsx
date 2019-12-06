import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import { RootState } from '../../store/reducer'

export const ExportDataComponent: React.FC = () => {
    const [columns, features] = useSelector((state: RootState) => {
        return [
            state.columns.columns,
            state.features.features,
        ]
    })

    const [close, setClose]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const filenameInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

    const exportData = async (): Promise<void> => {
        if (!filenameInputRef.current) {
            throw new Error('No reference to file name input')
        }

        if (!filenameInputRef.current.value) {
            return
        }

        const features_ = [
            columns,
            ...[...features.values()].flat()
        ]

        const filename: string = filenameInputRef.current.value

        const res: Response = await fetch('/api/v1/features', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: filename,
                features: features_
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
                ref={filenameInputRef}
            />
            <DialogSubmitButton
                onClick={exportData}
            >
                <p>Export</p>
            </DialogSubmitButton>
        </DialogUtilComponent>
    )
}