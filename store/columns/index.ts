import { Actions } from '../action'
import { Columns } from './actions'

export interface State {
    columns: Columns
}

export const initialState = (inject?: State): State => {
    return {
        columns: [],
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    switch (action.type) {
        case 'COLUMNS_SET_COLUMNS':
            // ちょいちょいバグる
            return {...state, columns: action.payload.columns}
        case 'COLUMNS_ADD_COLUMN':
            return {...state, columns: [...state.columns, action.payload.column]}
        default:
            return state
    }
}