import { Actions } from '../action'
import { Column } from './actions'

export interface State {
    columns: Column | []
}

export const initialState = (inject?: State): State => {
    return {
        columns: [],
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    switch (action.type) {
        case 'COLUMNS_INIT_COLUMNS':
            return {...state, columns: action.payload.columns}
        default:
            return state
    }
}