import types from './types'

export type Column = string[]

/**
 * 
 * @param columns 
 */
export const initColumns = (columns: Column) => {
    return {
        type: types.initColumns,
        payload: {
            columns
        }
    }
}

// export const addColumn = () => {}
// export const deleteColumn = () => {}