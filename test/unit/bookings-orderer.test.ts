import { arrangeBookings } from '../../lib/bookings-arranger'
import bookingsData1 from '../mock-data/bookings1.json'
import bookingsData2 from '../mock-data/bookings2.json'

describe('bookings-orderer', () => {
    test('should return correct order of bookings', () => {
        expect(arrangeBookings(bookingsData1)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    test('should return correct order of bookings', () => {
        expect(arrangeBookings(bookingsData2)).toEqual([15, 16, 17, 18, 1, 2, 3, 7, 5, 8, 13, 14, 9, 10, 4, 6, 11, 12])
    })
})
