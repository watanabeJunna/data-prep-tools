import uuid from 'uuid/v4'
import types from './types'
import { Feature, RawFeatures } from '../../interfaces'
import { type } from 'os'

/**
 * 
 * @param vector 
 */
export const initFeatures = (features: RawFeatures) => {
    return {
        type: types.initFeatures,
        payload: {
            features
        }
    }
}

/**
 * 
 */
export const addDimensions = (initialValue: string) => {
    return {
        type: types.addDimensions,
        payload: { 
            initialValue
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