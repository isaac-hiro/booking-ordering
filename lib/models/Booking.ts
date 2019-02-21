export default class Booking {
    public id: number = 0
    public start: number = 0
    public end: number = 0

    constructor(id: number, start: number, end: number) {
        this.id = id
        this.start = start
        this.end = end
    }

    public toString(): string {
        return `${this.id}[${this.start}/${this.end}]`
    }
}
