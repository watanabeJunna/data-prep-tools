import { Actions } from '../action'

export interface State {
    featureLength: number
}

export const initialState = (inject?: State): State => {
    return {
        featureLength: 0,
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions) => {
    switch (action.type) {
        case 'FEATURE_LENGTH_SET_FEATURE_LENGTH':
            return {...state, featureLength: action.payload.featureLength}
        default:
            return state
    }
}