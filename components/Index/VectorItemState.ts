//
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