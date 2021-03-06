import { combineReducers } from 'redux'
import * as Columns from './columns'
import * as Features from './features'
import * as LoadFilename from './loadFilename'
import * as ChunkLength from './chunkLength'
import * as CurrentChunkNumber from './currentChunkNumber'
import { FeatureValue } from '../interfaces'

export interface RootState {
    features: Features.State,
    columns: Columns.State,
    loadFilename: LoadFilename.State,
    chunkLength: ChunkLength.State,
    currentChunkNumber: CurrentChunkNumber.State,
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
    currentChunkNumber: {
        currentChunkNumber: 0
    }
}

export const initialState = (): RootState => {
    return {
        features: Features.initialState(inject.features),
        columns: Columns.initialState(inject.columns),
        loadFilename: LoadFilename.initialState(inject.loadFilename),
        chunkLength: ChunkLength.initialState(inject.chunkLength),
        currentChunkNumber: CurrentChunkNumber.initialState(inject.currentChunkNumber),
    }
}

export const reducer = combineReducers({
    features: Features.reducer,
    columns: Columns.reducer,
    loadFilename: LoadFilename.reducer,
    chunkLength: ChunkLength.reducer,
    currentChunkNumber: CurrentChunkNumber.reducer,
})