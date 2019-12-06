import types from './types'

export const setChunkLength = (chunkLength: number) => {
    return {
        type: types.setChunkLength,
        payload: {
            chunkLength
        }
    }
}