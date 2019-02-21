import Route from '../../../lib/models/Route'
import Booking from '../../../lib/models/Booking'

describe('Route', () => {
    describe('Empty Route', () => {
        const route: Route = new Route()

        test('should return 0 as length if no bookings exist', () => {
            expect(route.length).toEqual(0)
        })

        test('should return array as all bookings if no bookings exist', () => {
            expect(route.getAllBookings()).toEqual([])
        })

        test('should return undefined as first booking if no bookings exist', () => {
            expect(route.getFirstBooking()).toEqual(undefined)
        })

        test('should return undefined as first booking if no bookings exist', () => {
            expect(route.getLastBooking()).toEqual(undefined)
        })

        test('should return empty string if no bookings exist', () => {
            expect(route.toString()).toEqual('')
        })
    })

    describe('Route with Bookings added from constructor', () => {
        const firstBooking: Booking = new Booking(1, 2, 3)
        const secondBooking: Booking = new Booking(4, 5, 6)
        const route: Route = new Route(firstBooking, secondBooking)

        test('should return route length that equals the number of bookings', () => {
            expect(route.length).toEqual(2)
        })

        test('should return correct first booking', () => {
            expect(route.getFirstBooking()).toEqual(firstBooking)
        })

        test('should return correct last booking', () => {
            expect(route.getLastBooking()).toEqual(secondBooking)
        })

        test('should return all bookings', () => {
            expect(route.getAllBookings()).toEqual([firstBooking, secondBooking])
        })

        test('should return all bookings as a string', () => {
            expect(route.toString()).toEqual('1[2/3], 4[5/6]')
        })
    })

    describe('Route with Bookings added later', () => {
        const firstBooking: Booking = new Booking(1, 2, 3)
        const secondBooking: Booking = new Booking(4, 5, 6)
        const thirdBooking: Booking = new Booking(7, 8, 9)
        const route: Route = new Route(firstBooking)

        route.appendMultiple(secondBooking, thirdBooking)

        test('should return route length that equals the number of bookings', () => {
            expect(route.length).toEqual(3)
        })

        test('should return correct first booking', () => {
            expect(route.getFirstBooking()).toEqual(firstBooking)
        })

        test('should return correct last booking', () => {
            expect(route.getLastBooking()).toEqual(thirdBooking)
        })

        test('should return all bookings', () => {
            expect(route.getAllBookings()).toEqual([firstBooking, secondBooking, thirdBooking])
        })

        test('should return all bookings as a string', () => {
            expect(route.toString()).toEqual('1[2/3], 4[5/6], 7[8/9]')
        })
    })
})
