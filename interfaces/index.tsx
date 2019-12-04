import { ConfiguredStore } from "../store"

export type Vector = {
    id: string
    features: string[]
}

export type Tensor = Vector[]

export type PageContextProps = {
    store: ConfiguredStore
}