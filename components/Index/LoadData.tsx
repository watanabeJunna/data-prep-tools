import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import fetch from 'isomorphic-fetch'
import { Vector } from './DataPrepContainer'
import { RootState } from '../../store/reducer'
import { setFeatures } from '../../store/features/actions'
import { setColumns, Column } from '../../store/columns/actions'
import { setFeatureLength } from '../../store/featureLength/actions'
import { Feature, RawFeatures } from '../../interfaces'

export const LoadDataComponent: React.FC = () => {
    const dispatch: React.Dispatch<any> = useDispatch()
    const [features, columns] = useSelector(({features, columns}: RootState) => [features.features, columns.columns])

    console.log(features, columns)

    const [close, setClose]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const fileNameInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

    const checkVector = (features: RawFeatures): boolean => {
        let isValid: boolean = true

        const dimension: number = features[0].length

        features.forEach(feature => {
            if (feature.length !== dimension) {
                isValid = false
            }
        })

        return isValid
    }

    /**
     * If the number of vectors is enormous,
     * divide the vectors and save them in storage.
     * 
     * @param features Set of features.
     * @param threshold Number of divisions.
     */
    const splitFeatures = (features: Feature[], threshold: number): Feature[] => {
        if (features.length < threshold) {
            return features
        }

        let itemLength = 0
        const columns = features[0]

        for (let i = 0; i < features.length; i += threshold, itemLength++) {
            const processedVector = features.slice(i, i + threshold)

            // To avoid duplication, do not add the first data column
            if (itemLength !== 0) {
                processedVector.unshift(columns)
            }

            // 動的分割されたオブジェクトをどうReduxで管理するか
            // vectorItemStorage.setItem(itemLength, processedVector)
        }

        dispatch(setFeatureLength(itemLength))

        return features.slice(0, threshold)
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
        const temp = [...datas] // tempいるかなぁ

        const columns = (temp.shift() as string).replace(/[\r\n]/g, '').split(',')
        const features: RawFeatures = temp.map(data => data.replace(/[\r\n]/g, '').split(','))

        setClose(true)

        dispatch(setColumns(columns))
        dispatch(setFeatures(features))

        if (!checkVector(features)) {
            throw new Error('Invalid data')
        }

        const editableNumber: number = 100

        // Init Storage
        if (window.localStorage) {
            window.localStorage.clear()
        }

        // setItemLength(0)

        // Set Storage
        // const splitVectorArray: Vector = splitAndSaveVector(vector, editableNumber)

        // setCurrentDataNumber(0)
        // setVector(splitVectorArray)
        // setLoadFileName(fileName)
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