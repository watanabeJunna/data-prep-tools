import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import { RootState } from '../../store/reducer'
import { FeatureValue } from '../../interfaces'

export const ExportDataComponent: React.FC = () => {
    const [columns, features] = useSelector((state: RootState) => {
        return [
            state.columns.columns,
            state.features.features,
        ]
    })
    const [close, setClose] = useState<boolean>(false)
    const filenameInputRef = useRef<HTMLInputElement | null>(null)

    /**
     * Output header and features.
     */
    const exportData = async (): Promise<void> => {
        if (!filenameInputRef.current) {
            throw new Error('No reference to file name input')
        }

        if (!filenameInputRef.current.value) {
            return
        }

        const features_: FeatureValue = [
            columns,
            ...[...features.values()].flat()
        ]
        const filename = filenameInputRef.current.value
        const response: Response = await fetch('/api/v1/features', {
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

        if (response.status !== 200) {
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