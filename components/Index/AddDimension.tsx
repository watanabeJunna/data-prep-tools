import { useState, useRef, Dispatch } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import { Vector } from './DataPrepContainer'
import { State } from '../../store/features'
import { initFeatures, initDimensions } from '../../store/features/actions'
import { initColumns } from '../../store/columns/actions'
import { RootState } from '../../store/reducer'

export const AddDimensionComponent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [features, columns] = useSelector(({features, columns}: RootState) => [features.features, columns.columns])
    console.log(features)
    console.log(columns)

    const [close, setClose]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false)

    const dimInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

    const onSubmit = (): void => {
        if (!dimInputRef.current) {
            throw new Error('No reference to file name input')
        }

        if (!dimInputRef.current.value) {
            return
        }

        const dimension: string = dimInputRef.current.value

        // if (!tensor) {
        //     return
        // }

        if (!dimension) {
            return
        }

        const rawFeatures: string[][] = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'c']
        ]

        const columns: string[] = ['a', 'b', 'v']

        dispatch(initFeatures(rawFeatures))
        dispatch(initColumns(columns))

        if (features !== []) {

            dispatch(initDimensions())
        }

        setClose(true)
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