import types from './types'

export const setCurrentChunkNumber = (chunkNumber: number) => {
    return {
        type: types.setCurrentChunkNumber,
        payload: {
            chunkNumber
        }
    }
}