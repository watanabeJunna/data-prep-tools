import { Actions } from '../action'

export interface State {
    currentChunkNumber: number
}

export const initialState = (inject?: State): State => {
    return {
        currentChunkNumber: 0,
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    switch (action.type) {
        case 'CURRENT_CHUNK_NUMBER_SET_CURRENT_CHUNK_NUMBER':
            return {...state, currentChunkNumber: action.payload.chunkNumber}
        default:
            return state
    }
}