import types from './types'

export const setLoadFilename = (filename: string) => {
    return {
        type: types.setLoadFilename,
        payload: {
            filename
        }
    }
}