import { ConfiguredStore } from '../store'

export type FeatureValue = string[][]

export type Features = Map<number, FeatureValue>

export type PageContextProps = {
    store: ConfiguredStore
}