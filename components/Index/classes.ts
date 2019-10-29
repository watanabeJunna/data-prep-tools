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
        console.log(itemLength)
        this.itemLength = itemLength
    }
}

export class VectorItemStorageSetter {
    // 
    protected dataPrefix: string = 'vector.'

   /**
     * 
     * @param itemLength 
     */
    public setItemLengthToLocalStorage(itemLength: number): void {
        window.localStorage.setItem('item_length', itemLength.toString())
    }

    /**
     * 
     * @param key 
     * @param objStr 
     */
    public setItemToLocalStorage(key: number, objStr: string): void {
        window.localStorage.setItem((this.dataPrefix + key), objStr)
    }
}
