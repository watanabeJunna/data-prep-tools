import { ConfiguredStore } from '../store'

export type RawFeatures = string[][]

export type Feature = {
    id: string
    value: string[]
}

export type PageContextProps = {
    store: ConfiguredStore
}