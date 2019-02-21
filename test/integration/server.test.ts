import request from 'supertest'

import server from '../../lib/server'
import bookingsData1 from '../mock-data/bookings1.json'
import bookingsData2 from '../mock-data/bookings2.json'
import bookingsData3 from '../mock-data/bookings3.json'
import allInvalidBookings from '../mock-data/allInvalidBookings.json'

const agent = request.agent(server.callback())

describe('BookingOrdering service', () => {
    test('should return with 400 and message "Invalid request" non-valid endpoint is used', async () => {
        const response = await agent
            .get('/api/test')
            .expect(400)

        expect(response.text).toEqual('Invalid request')
    })

    test('should return with 400 and message "Invalid request" if no valid JSON data is provided', async () => {
        const response = await agent
            .post('/api/orderedBookings')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400)

        expect(response.text).toEqual('Invalid request')
    })

    test('should return an arary of id-s if valid JSON data is given', async () => {
        const response = await agent
            .post('/api/orderedBookings')
            .send(bookingsData1)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    test('should return an arary of id-s if valid JSON data is given', async () => {
        const response = await agent
            .post('/api/orderedBookings')
            .send(bookingsData2)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body).toEqual([1, 2, 3, 7, 5, 8, 13, 14, 9, 10, 4, 6, 11, 12, 15, 16])
    })

    test('should return an arary of id-s if valid JSON data is given and exclude invalid bookings', async () => {
        const response = await agent
            .post('/api/orderedBookings')
            .send(bookingsData3)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body).toEqual([5, 4, 1, 6, 7])
    })

    test('should return an empty array if all bookings are invalid', async () => {
        const response = await agent
            .post('/api/orderedBookings')
            .send(allInvalidBookings)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body).toEqual([])
    })
})
