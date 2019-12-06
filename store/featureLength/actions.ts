import types from './types'

export const setFeatureLength = (featureLength: number) => {
    return {
        type: types.setFeatureLength,
        payload: {
            featureLength
        }
    }
}