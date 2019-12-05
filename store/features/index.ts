import uuid from 'uuid/v4'
import { Actions } from '../action'
import { Features, FeatureValue } from '../../interfaces'

export interface State {
    features: Features
}

export const initialState = (inject?: State): State => {
    return {
        features: new Map<number, FeatureValue>(),
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    let features: FeatureValue
    const featureMap: Features = new Map<number, FeatureValue>()

    switch (action.type) {
        case 'FEATURES_SET_FEATURES':
            features = action.payload.features

            if (features.length < 100) {
                featureMap.set(0, features)
                return {...state, features: featureMap}
            }

            for (let i: number = 0, dataNumber = 0; i < features.length; i += action.payload.threshold, dataNumber++) {
                const splitedFeatures: FeatureValue = features.slice(i, i + action.payload.threshold)
                featureMap.set(dataNumber, splitedFeatures)
            }

            return {...state, features: featureMap}
        case 'FEATURES_ADD_DIMENSION':
            if (!state.features.size) {
                return state
            }

            state.features.forEach((value: FeatureValue, key: number) => {
                const updatedValue = value.map((feature: string[]) => {
                    return [...feature, action.payload.initialValue]
                })

                featureMap.set(key, updatedValue)
            })

            return {...state, features: featureMap}
        case 'FEATURES_UPDATE_SCALAR':
            if (!state.features.size) {
                return state
            }

            const features_: FeatureValue = (state.features.get(action.payload.dataNumber) as FeatureValue)
            features_[action.payload.index][action.payload.axis] = action.payload.value
            const updatedFeaturesMap = new Map([...state.features])
            updatedFeaturesMap.set(action.payload.dataNumber, features_)

            return {...state, features: updatedFeaturesMap}
        default:
            return state
    }
}