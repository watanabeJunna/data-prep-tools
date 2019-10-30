import { Vector } from './DataPrepContainer'

export class VectorItemStorage {
    // 
    protected dataPrefix: string = 'vector.'

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
    public setItem(key: number, objStr: string): void {
        window.localStorage.setItem((this.dataPrefix + key), objStr)
    }
}
