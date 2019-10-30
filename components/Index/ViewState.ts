//
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