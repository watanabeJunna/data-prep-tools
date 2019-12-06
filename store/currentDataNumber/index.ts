import { Actions } from '../action'

export interface State {
    currentDataNumber: number
}

export const initialState = (inject?: State): State => {
    return {
        currentDataNumber: 0,
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    switch (action.type) {
        case 'CURRENT_DATA_NUMBER_SET_CURRENT_DATA_NUMBER':
            return {...state, currentDataNumber: action.payload.dataNumber}
        default:
            return state
    }
}