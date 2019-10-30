import { Vector } from './DataPrepContainer'

type Columns = string[]
type Features = Vector

export type FeatureTable = {
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
     * @param args 
     */
    public zip(args: string[][]): string[][] {
        let ret: string[][] = [...Array(args[0].length)].map(() => [])

        for (let l = 0; l < args[0].length; l++) {
            for (let i = 0; i < args.length; i++) {
                ret[l][i] = args[i][l]
            }
        }

        return ret
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

    /**
     * 
     * @returns
     */
    public getColumns(): string[] {
        const keys =  Object.keys(this.featureTable)

        return keys
    }

    /**
     * 
     * @param columnName 
     */
    public getFeature(columnName: string): string[] {
        return this.featureTable[columnName]
    }

    /**
     * 
     * @param columnName 
     */
    public getFeatures(): string[][] {
        const values = Object.values(this.featureTable)

        return values
    }

    /**
     * 
     * @param columnName 
     * @param values 
     */
    public setFeature(columnName: string, features: any[]): void {
        this.featureTable[columnName] = features
    }

    /**
     * @returns
     */
    public toArray(): string[][] {
        const ret = []

        const columns = this.getColumns()
        const features = this.getFeatures()
        const processed_features = this.zip(features)
        
        ret.push(columns)
        ret.push(...processed_features)

        return ret
    }
}