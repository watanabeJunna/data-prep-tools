import { createStore, Store, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import persist, { persistReducer, persistStore, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { initialState, reducer } from './reducer'
import { FeatureValue, Features } from '../interfaces'

export type StoreState = ReturnType<typeof initialState>
export type ReduxStoreInstance = Store<StoreState>
// export type ReducerState = ReturnType<typeof reducer>
// export type ReduxReducerInstance = Reducer<ReducerState>

const makeConfiguredStore = (reducer: Reducer, initialState: StoreState) =>
    createStore(reducer, initialState, composeWithDevTools())

export type ConfiguredStore = ReturnType<typeof makeConfiguredStore> & {
    persistor: persist.Persistor
}

type ExpandFeatures = [number, FeatureValue][]

interface SubState {
    features: Features
}

interface EndSubState {
    features: ExpandFeatures
}

// I need to guess the type of IF statement
export const persistFeatures = createTransform<SubState | EndSubState, SubState | EndSubState>(
    (inbound) => {
        if (inbound.features) {
            return {...inbound, features: [...inbound.features]}
        }
        return inbound
    },
    (outBound) => {
        if (outBound.features) {
            return {...outBound, features: new Map<number, FeatureValue>(outBound.features)}
        }
        return outBound
    }
)

export const initStore = (state = initialState()) => {
    if (process.browser) {
        const persistConfig = {
            transforms: [persistFeatures],
            key: 'root',
            whitelist: ['columns', 'currentChunkNumber', 'features', 'chunkLength', 'loadFilename'], 
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