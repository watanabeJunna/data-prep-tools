import { combineReducers } from 'redux'
import * as Features from './features'
import * as Columns from './columns'
import { State as FeatureState } from './features'
import { State as ColumnState } from './columns'

// typescriptで配列ってどうやって表現するんだっけ
export interface RootState {
    features: FeatureState | {
        features: string[]
    },
    columns: ColumnState | {
        columns: string[]
    }
}

const inject: RootState = {
    features: {
        features: []
    },
    columns: {
        columns: []
    }
}

export const initialState = (): RootState => {
    return {
        features: Features.initialState(inject.features),
        columns: Columns.initialState(inject.columns),
    }
}

export const reducer = combineReducers({
    features: Features.reducer,
    columns: Columns.reducer,
})