import { Actions } from '../action'
import { Tensor } from '../../interfaces'

export type State = Tensor | {}

export const initialState = (inject?: State): State => {
    return {
        tensor: {},
        ...inject
    }
}

export const reducer = (state = initialState(), action: Actions): State => {
    switch (action.type) {
        case 'TENSOR_ADD_VECTOR':
            return {...state, tensor: action.payload}
        default:
            return state
    }
}