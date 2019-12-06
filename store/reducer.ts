import { combineReducers } from 'redux'
import * as Columns from './columns'
import * as Features from './features'
import * as LoadFilename from './loadFilename'
import * as ChunkLength from './chunkLength'
import * as CurrentDataNumber from './currentDataNumber'
import { FeatureValue } from '../interfaces'

export interface RootState {
    features: Features.State,
    columns: Columns.State,
    loadFilename: LoadFilename.State,
    chunkLength: ChunkLength.State,
    currentDataNumber: CurrentDataNumber.State,
}

const inject: RootState = {
    features: {
        features: new Map<number, FeatureValue>()
    },
    columns: {
        columns: []
    },
    loadFilename: {
        loadFilename: ''
    },
    chunkLength: {
        chunkLength: 0
    },
    currentDataNumber: {
        currentDataNumber: 0
    }
}

export const initialState = (): RootState => {
    return {
        features: Features.initialState(inject.features),
        columns: Columns.initialState(inject.columns),
        loadFilename: LoadFilename.initialState(inject.loadFilename),
        chunkLength: ChunkLength.initialState(inject.chunkLength),
        currentDataNumber: CurrentDataNumber.initialState(inject.currentDataNumber),
    }
}

export const reducer = combineReducers({
    features: Features.reducer,
    columns: Columns.reducer,
    loadFilename: LoadFilename.reducer,
    chunkLength: ChunkLength.reducer,
    currentDataNumber: CurrentDataNumber.reducer,
})