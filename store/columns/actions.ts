import types from './types'

export type Column = string[]

/**
 * 
 * @param columns 
 */
export const setColumns = (columns: Column) => {
    return {
        type: types.setColumns,
        payload: {
            columns
        }
    }
}

export const addColumn = (column: string) => {
    return {
        type: types.addColumn,
        payload: {
            column
        }
    }
}
// export const deleteColumn = () => {}