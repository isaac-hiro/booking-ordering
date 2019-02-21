import Booking from './Booking'

export default class Route {
    private bookings: Booking[] = []

    constructor(...bookings: Booking[]) {
        this.appendMultiple(...bookings)
    }

    get length(): number {
        return this.bookings.length
    }

    public appendMultiple(...bookings: Booking[]) {
        this.bookings.push(...bookings)
    }

    public getAllBookings(): Booking[] {
        return this.bookings
    }

    public getFirstBooking(): Booking | undefined {
        if (!this.bookings.length) {
            return
        }

        return this.bookings[0]
    }

    public getLastBooking(): Booking | undefined {
        if (!this.bookings.length) {
            return
        }

        return this.bookings[this.bookings.length - 1]
    }

    public toString(): string {
        return this.bookings.map((booking: Booking) => booking.toString()).join(', ')
    }
}
