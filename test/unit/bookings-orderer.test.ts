import { orderBookings } from '../../lib/bookings-orderer'
import bookingsData1 from '../mock-data/bookings1.json'
import bookingsData2 from '../mock-data/bookings2.json'
import bookingsData3 from '../mock-data/bookings3.json'
import allInvalidBookings from '../mock-data/allInvalidBookings.json'

describe('bookings-orderer', () => {
    test('should return correct order of bookings', () => {
        expect(orderBookings(bookingsData1)).toEqual([1, 2, 3, 4, 5, 6, 7])
        expect(orderBookings(bookingsData2)).toEqual([1, 2, 3, 7, 5, 8, 13, 14, 9, 10, 4, 6, 11, 12, 15, 16])
    })

    test('should return correct order of bookings and exclude invalid bookings', () => {
        expect(orderBookings(bookingsData3)).toEqual([5, 4, 1, 6, 7])
    })

    test('should return empty array if all bookings are invalid', () => {
        expect(orderBookings(allInvalidBookings)).toEqual([])
    })
})
