import types from './types'

export const setLoadFilename = (filename: string) => {
    return {
        type: types.setLoadFilname,
        payload: {
            filename
        }
    }
}