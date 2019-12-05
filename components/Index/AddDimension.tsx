import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DialogUtilComponent, DialogSubmitButton, DialogInput } from '../Dialog'
import { addDimensions } from '../../store/features/actions'
import { addColumn } from '../../store/columns/actions'
import { RootState } from '../../store/reducer'

export const AddDimensionComponent: React.FC = () => {
    const dispatch: React.Dispatch<any> = useDispatch()
    const [features, columns] = useSelector(({features, columns}: RootState) => [features.features, columns.columns])

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

        if (features === [] && columns === []) {
            return
        }

        if (!dimInputRef.current.value) {
            return
        }
            
        dispatch(addColumn(dimInputRef.current.value))
        dispatch(addDimensions(''))
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