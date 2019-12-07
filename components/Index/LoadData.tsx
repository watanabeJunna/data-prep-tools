import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import { setFeatures } from '../../store/features/actions'
import { setColumns, Columns } from '../../store/columns/actions'
import { setChunkLength } from '../../store/chunkLength/actions'
import { FeatureValue } from '../../interfaces'
import { setLoadFilename } from '../../store/loadFilename/actions'

export const LoadDataComponent: React.FC = () => {
    const [close, setClose]　= useState<boolean>(false)
    const dispatch = useDispatch()
    const fileNameInputRef　= useRef<HTMLInputElement | null>(null)

    /**
     * Check if the feature is normal.
     * 
     * @param features The features to Check.
     * @returns Is the feature normal
     */
    const checkFeatures = (features: FeatureValue): boolean => {
        let isValid = true

        const dimension = features[0].length

        features.forEach(feature => {
            if (feature.length !== dimension) {
                isValid = false
            }
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

        const filename = fileNameInputRef.current.value
        const response: Response = await fetch('/api/v1/features', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename: filename })
        })

        if (response.status !== 200) {
            return
        }

        const datas: string[] = await response.json()
        const columns: Columns = (datas.shift() as string).replace(/[\r\n]/g, '').split(',')
        const features: FeatureValue = datas.map(data => data.replace(/[\r\n]/g, '').split(','))

        setClose(true)

        if (!checkFeatures(features)) {
            throw new Error('Invalid data')
        }

        const threshold = 100
        let chunkNumber = 0

        for (let i = 0; i < features.length; i += threshold, chunkNumber++);

        dispatch(setColumns(columns))
        dispatch(setFeatures(features, threshold))
        dispatch(setChunkLength(chunkNumber))
        dispatch(setLoadFilename(filename))
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
                defaultValue='data/index.csv'
            />
            <DialogSubmitButton
                onClick={onSubmit}
            >
                <p>Submit</p>
            </DialogSubmitButton>
        </DialogUtilComponent>
    )
}