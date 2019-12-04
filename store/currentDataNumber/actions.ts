import types from './types'

export const setCurrentDataNumber = (dataNumber: number) => {
    return {
        type: types.setCurrentDataNumber,
        payload: {
            dataNumber
        }
    }
}