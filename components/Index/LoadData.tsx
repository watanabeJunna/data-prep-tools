import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import { setFeatures } from '../../store/features/actions'
import { setColumns, Columns } from '../../store/columns/actions'
import { setFeatureLength } from '../../store/featureLength/actions'
import { FeatureValue } from '../../interfaces'
import { setLoadFilename } from '../../store/loadFilename/actions'

export const LoadDataComponent: React.FC = () => {
    const [close, setClose]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const dispatch: React.Dispatch<any> = useDispatch()
    const fileNameInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

    /**
     * 
     * @param features 
     */
    const checkFeatures = (features: FeatureValue): boolean => {
        let isValid: boolean = true

        const dimension: number = features[0].length

        features.forEach((feature: string[]) => {
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

        const filename: string = fileNameInputRef.current.value

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
        const datasCopy = [...datas]
        const columns: Columns = (datasCopy.shift() as string).replace(/[\r\n]/g, '').split(',')
        const features: FeatureValue = datasCopy.map(data => data.replace(/[\r\n]/g, '').split(','))

        setClose(true)

        if (!checkFeatures(features)) {
            throw new Error('Invalid data')
        }

        const threshold: number = 100
        let dataNumber: number = 0

        for (let i: number = 0; i < features.length; i += threshold, dataNumber++);

        dispatch(setColumns(columns))
        dispatch(setFeatures(features, threshold))
        dispatch(setFeatureLength(dataNumber))
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