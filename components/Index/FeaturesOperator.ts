import { Vector } from './DataPrepContainer'

type Columns = string[]
type Features = string[][]

type FeatureTable = {
    [key: string]: any[]
}

// Can be used universally as a structure separated into columns and body parts
export class FeaturesOperator {
    private featureTable: FeatureTable = {}

    /**
     * 
     * @param vector 
     */
    constructor(vector: Vector) {
        this.setFeatures([...vector])
    }

    /**
     * 
     * @param columns 
     * @param rows 
     */
    private checkDimension(columns: Columns, rows: Features): boolean {
        let isValid: boolean = true

        const dimension: number = columns.length

        rows.forEach(row => {
            if (row.length !== dimension) {
                isValid = false
            }
        })

        return isValid
    }

    /**
     * 
     * @param vector 
     */
    public setFeatures(vector: Vector): void {
        if (vector.length < 2) {
            throw new Error('The number of elements in the vector is not appropriate')
        }

        const columns: Columns = [...vector.shift() as Columns]
        const rows: Features = vector.map((features: string[]) => [...features])

        if (!this.checkDimension(columns, rows)) {
            throw new Error('Column and row dimensions do not match')
        }

        [...Array(columns.length)].map((_: any, c: number) => {
            const column = columns[c]
            const features = this.getDimensionFromFeatures(c, rows)

            this.setFeature(column, features)
        })
    }

    /**
     * 
     * @param dimension 
     * @param vector 
     */
    private getDimensionFromFeatures(dimension: number, vector: Vector): string[] {
        if (dimension < 0) {
            throw new Error('Invalid dimension, value must be greater than or equal to 0')
        }

        return vector.map((features: string[]) => {
            return features[dimension]
        })
    }

    public setColumn(columnName: string): void {
        this.featureTable.columns[columnName] = {}
    }

    public getColumns(): string[] {

    }

    /**
     * 
     * @param columnName 
     */
    public getFeature(columnName: string): string[] {
        return (this as any)[columnName]
    }

    /**
     * 
     * @param columnName 
     * @param values 
     */
    public setFeature(columnName: string, values: any[]): void {
        Object.assign(this, {
            [columnName]: values
        })
    }
}