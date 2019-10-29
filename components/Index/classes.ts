import { Vector } from './DataPrepContainer'

export class ViewState {
    //
    private scrollTop: number = 0

    /**
     * 
     * @returns
     */
    public getScrollTop(): number {
        return this.scrollTop
    }

    /**
     * 
     * @param value 
     */
    public setScrollTop(value: number): void {
        this.scrollTop = value
    }
}

// Can be used universally as a structure separated into columns and body parts
export class VectorStrcutre {
    constructor(vector: Vector) {
        
    }
}

export class VectorItemState {
    // 
    private currentDataNumber: number = 0

    //
    private itemLength: number = 0

    /**
     * 
     * @returns
     */
    public getCurrentDataNumber(): number {
        return this.currentDataNumber
    }

    /**
     * 
     * @param dataNumber 
     */
    public setCurrentDataNumber(dataNumber: number): void {
        this.currentDataNumber = dataNumber
    }

    /**
     * 
     * @returns
     */
    public getItemLength(): number {
        return this.itemLength
    }

    /**
     * 
     * @param itemLength 
     */
    public setItemLength(itemLength: number): void {
        this.itemLength = itemLength
    }
}

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
