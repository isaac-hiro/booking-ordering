import Booking from '../models/Booking'

import logger from './logger'

export const convertInputDataToBookings = (data: any): Booking[] => {
    const bookings: Booking[] = []

    data.forEach((dataElem: any) => {
        if (
            !Number.isInteger(dataElem.id)
            || !Number.isInteger(dataElem.start)
            || !Number.isInteger(dataElem.end)
        ) {
            logger.warn(`Invalid booking data: ${JSON.stringify(dataElem)}`)
            return
        }

        bookings.push(new Booking(dataElem.id, dataElem.start, dataElem.end))
    })

    return bookings
}

export const removeBookings = (bookings: Booking[], bookingsToRemove: Booking[]): Booking[] => {
    const idsToRemove: number[] = bookingsToRemove.map((booking: Booking) => booking.id)

    return bookings.filter((booking: Booking) => !idsToRemove.includes(booking.id))
}
