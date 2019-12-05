import uuid from 'uuid/v4'
import { Actions } from '../action'
import { Feature } from '../../interfaces'

export interface State {
    features: Feature[] | string[]
}

export const initialState = (inject?: State): State => {
    return {
        features: [],
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    let features: Feature[]

    switch (action.type) {
        case 'FEATURES_SET_FEATURES':
            features = action.payload.features.map((feature: string[]) => {
                return {
                    id: uuid(),
                    value: feature
                }
            })

            const threshold = 100

            // featuresの型をMapにすること！！！！
            if (features.length < 100) {
                return {...state, features: features}
            }

            let itemLength = 0
            const featuresMap = new Map()

            for (let i = 0; i < features.length; i += threshold, itemLength++) {
                const processedVector = features.slice(i, i + threshold)

                

                // 動的分割されたオブジェクトをどうReduxで管理するか
                // vectorItemStorage.setItem(itemLength, processedVector)
            }

            return {...state, features: features}
        case 'FEATURES_ADD_DIMENSION':
            if (state.features === []) {
                return state
            }

            features = [...state.features as Feature[]].map((feature: Feature) => {
                return {
                    ...feature,
                    id: feature.id,
                    value: [...feature.value, action.payload.initialValue] 
                }
            })

            return {...state, features: features}
        default:
            return state
    }
}