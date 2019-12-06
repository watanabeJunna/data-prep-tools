import { Actions } from '../action'

export interface State {
    loadFilename: string
}

export const initialState = (inject?: State) => {
    return {
        loadFilename: '',
        ...inject        
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    switch (action.type) {
        case 'LOAD_FILENAME_SET_LOAD_FILENAME':
            return {...state, loadFilename: action.payload.filename}
        default:
            return state
    }
}