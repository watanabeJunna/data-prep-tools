import { Actions } from '../action'
import { Column } from './actions'

export interface State {
    columns: Column
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
            console.log(action.payload.columns)
            return {...state, columns: action.payload.columns}
        case 'COLUMNS_ADD_COLUMN':
            return {...state, columns: [...state.columns, action.payload.column]}
        default:
            return state
    }
}