import { combineReducers } from 'redux'
import * as Tensor from './tensor'
import { State } from './tensor'

const inject: State = {
    tensor: []
}

export const initialState = (): State => {
    return {
        tensor: Tensor.initialState(inject),
    }
}

export const reducer = combineReducers({
    tensor: Tensor.reducer,
})