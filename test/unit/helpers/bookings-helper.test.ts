import { convertInputDataToBookings, removeBookings } from '../../../lib/helpers/bookings-helper'
import Booking from '../../../lib/models/Booking'

describe('bookingsHelper', () => {
    describe('convertInputDataToBookings', () => {
        test('should create an array of Bookings from valid data', () => {
            const mockData: string = JSON.parse(`[
                {"id": 1, "start": 2, "end": 3},
                {"id": 4, "start": 5, "end": 6}
            ]`)

            const expectedData: Booking[] = [
                new Booking(1, 2, 3),
                new Booking(4, 5, 6),
            ]

            expect(convertInputDataToBookings(mockData)).toEqual(expectedData)
        })

        test('should create an array of Bookings and skip invalid data', () => {
            const mockData: string = JSON.parse(`[
                {"id": 1, "start": 2, "end": 3},
                {"id": "invalid", "start": 7, "end": 8},
                {"id": 4, "start": 5},
                {"id": 6, "end": 3}
            ]`)

            const expectedData: Booking[] = [
                new Booking(1, 2, 3),
            ]

            expect(convertInputDataToBookings(mockData)).toEqual(expectedData)
        })
    })

    describe('removeBookings', () => {
        test('should return an array of bookings with given bookings removed', () => {
            const bookings: Booking[] = [
                new Booking(1, 2, 3),
                new Booking(4, 5, 6),
                new Booking(7, 8, 9),
            ]

            const bookingsToRemove: Booking[] = [
                new Booking(1, 2, 3),
                new Booking(7, 8, 9),
            ]

            const expectedBookings: Booking[] = [
                new Booking(4, 5, 6),
            ]

            expect(removeBookings(bookings, bookingsToRemove)).toEqual(expectedBookings)
        })

        test('should return original array of bookings if no bookings to remove are given', () => {
            const bookings: Booking[] = [
                new Booking(1, 2, 3),
                new Booking(4, 5, 6),
                new Booking(7, 8, 9),
            ]

            expect(removeBookings(bookings, [])).toEqual(bookings)
        })

        test('should return and empty array if no booking are given to remove from', () => {
            const bookingsToRemove: Booking[] = [
                new Booking(1, 2, 3),
                new Booking(7, 8, 9),
            ]

            expect(removeBookings([], bookingsToRemove)).toEqual([])
        })
    })
})
