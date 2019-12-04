import { combineReducers } from 'redux'
import * as Features from './features'
import { State } from './features'

export interface RootState {
    features: State | {
        features: object
    }
}

const inject: RootState = {
    features: {
        features: {}
    }
}

export const initialState = (): RootState => {
    return {
        features: Features.initialState(inject.features),
    }
}

export const reducer = combineReducers({
    features: Features.reducer,
})