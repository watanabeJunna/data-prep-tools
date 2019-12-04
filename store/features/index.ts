import uuid from 'uuid/v4'
import { Actions } from '../action'
import { Feature } from '../../interfaces'

export interface State {
    features: Feature[] | []
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
        case 'FEATURES_INIT_FEATURES':
            features = action.payload.features.map((feature: string[]) => {
                return {
                    id: uuid(),
                    value: feature
                }
            })

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