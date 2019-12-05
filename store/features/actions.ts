import types from './types'
import { FeatureValue } from '../../interfaces'

/**
 * 
 * @param vector 
 */
export const setFeatures = (features: FeatureValue, threshold: number) => {
    return {
        type: types.setFeatures,
        payload: {
            threshold,
            features,
        }
    }
}

/**
 * 
 * @param initialValue 
 */
export const addDimensions = (initialValue: string) => {
    return {
        type: types.addDimensions,
        payload: { 
            initialValue
        }
    }
}

/**
 * 
 * @param dataNumber 
 * @param axis 
 * @param index 
 * @param value 
 */
export const updateScalar = (dataNumber: number, axis: number, index: number, value: string) => {
    return {
        type: types.updateScalar,
        payload: {
            value,
            dataNumber,
            axis,
            index,
        }
    }
}

// /**
//  * 
//  * @param vector 
//  */
// export const addVector = (vector: Vector) => {
//     return {
//         type: types.addVector,
//         payload: {
//             id: uuid(),
//             vector
//         }
//     }
// }

// /**
//  * 
//  * @param id 
//  */
// export const deleteVector = (id: string) => {
//     return {
//         type: types.deleteVector,
//         payload: { id }
//     }
// }

// /**
//  * 
//  * @param id 
//  * @param vector 
//  */
// export const changeVector = (id: string, vector: Vector) => {
//     return {
//         type: types.changeVector,
//         payload: {
//             id,
//             vector
//         }
//     }
// }