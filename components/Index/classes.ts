export class ViewState {
    private scrollTop: number = 0

    public getScrollTop(): number {
        return this.scrollTop
    }

    public setScrollTop(value: number): void {
        this.scrollTop = value
    }
}