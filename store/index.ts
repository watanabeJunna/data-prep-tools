import { createStore, Store, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { initialState, reducer } from './reducer'

export type StoreState = ReturnType<typeof initialState>
export type ReduxStoreInstance = Store<StoreState>
// export type ReducerState = ReturnType<typeof reducer>
// export type ReduxReducerInstance = Reducer<ReducerState>

const makeConfiguredStore = (reducer: Reducer, initialState: StoreState) =>
    createStore(reducer, initialState, composeWithDevTools())

export type ConfiguredStore = ReturnType<typeof makeConfiguredStore> & {
    persistor: Persistor
}

export const initStore = (state = initialState()) => {
    if (process.browser) {
        const persistConfig = {
            key: 'root',
            whitelist: ['tensor'], 
            storage
        }

        const persistedReducer = persistReducer(persistConfig, reducer)
        const store = makeConfiguredStore(persistedReducer, state) as ConfiguredStore

        store.persistor = persistStore(store)

        return store
    } else {
        return makeConfiguredStore(reducer, state)
    }
}