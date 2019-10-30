import { Vector } from './DataPrepContainer'

export class VectorItemStorage {
    // 
    private dataPrefix: string = 'vector.'

    //
    private editableNumber = 100

    //
    public static localStorage?: Storage = process.browser ? window.localStorage : undefined

    /**
     * @returns
     */
    public getItemLength(): number {
        const item_length = window.localStorage.getItem('item_length')

        if (!item_length) {
            throw Error('Item length is not set.')
        }

        return parseInt(item_length)
    }

    /**
     * 
     * @param itemLength 
     */
    public setItemLength(itemLength: number): void {
        window.localStorage.setItem('item_length', itemLength.toString())
    }

    /**
     * @returns
     */
    public getItem(key: number): Vector {
        const item = window.localStorage.getItem(this.dataPrefix + key)

        if (!item) {
            throw Error('Item not found.')
        }

        return JSON.parse(item)
    }

    /**
     * 
     * @param key 
     * @param objStr 
     */
    public setItem(key: number, vector: Vector): void {
        const processed: string = JSON.stringify(vector)
        window.localStorage.setItem((this.dataPrefix + key), processed)
    }

    /**
     * 
     * @param vector 
     */
    public setVector(vector: Vector): void {
        if (vector.length < this.editableNumber) {
            this.setItem(0, vector)

            return
        }

        let itemLength: number = 0

        const columns: string[] = vector[0]

        for (let i = 0; i < vector.length; i += this.editableNumber, itemLength++) {
            const processedVector = vector.slice(i, i + this.editableNumber)
            processedVector.unshift(columns)

            this.setItem(itemLength, processedVector)
        }

        this.setItemLength(itemLength)
    }
}
