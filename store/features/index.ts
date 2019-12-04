import { Actions } from '../action'
import { Feature } from '../../interfaces'

export interface State {
    features: Feature[] | {}
}

export const initialState = (inject?: State): State => {
    return {
        features: {},
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    switch (action.type) {
        case 'FEATURES_INIT_FEATURES':
            return {...state, features: action.payload.features}
        case 'FEATURES_INIT_DIMENSIONS':
            if (state.features === {}) {
                return state
            }

            let features_ = {...state.features as Feature[]}

            features_ = features_.map((features: Feature) => {
                return {
                    ...features,
                    id: features.id,
                    value: [...features.value, ''] 
                }
            })

            return {...state, features: features_}
        default:
            return state
    }
}