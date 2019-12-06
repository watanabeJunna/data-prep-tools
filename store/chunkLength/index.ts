import { Actions } from '../action'

export interface State {
    chunkLength: number
}

export const initialState = (inject?: State): State => {
    return {
        chunkLength: 0,
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions) => {
    switch (action.type) {
        case 'CHUNK_LENGTH_SET_CHUNK_LENGTH':
            return {...state, chunkLength: action.payload.chunkLength}
        default:
            return state
    }
}