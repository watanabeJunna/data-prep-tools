import types from './types'

export type Columns = string[]

/**
 * 
 * @param columns 
 */
export const setColumns = (columns: Columns) => {
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