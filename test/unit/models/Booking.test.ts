
import Booking from '../../../lib/models/Booking'

describe('Booking', () => {
    test('should return correct string from toString()', () => {
        const booking: Booking = new Booking(1, 2, 3)

        expect(booking.toString()).toBe('1[2/3]')
    })
})
