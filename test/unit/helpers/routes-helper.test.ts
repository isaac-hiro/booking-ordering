import Booking from '../../../lib/models/Booking'
import Route from '../../../lib/models/Route'
import { getAllRoutesIndices, getRouteIndices, getRoutesAsString } from '../../../lib/helpers/routes-helper'

describe('routesHelper', () => {
    describe('getRouteIndices', () => {
        test('should return an array of indices from bookings of a given route', () => {
            const firstBooking: Booking = new Booking(1, 2, 3)
            const secondBooking: Booking = new Booking(4, 5, 6)
            const route: Route = new Route(firstBooking, secondBooking)

            expect(getRouteIndices(route)).toEqual([1, 4])
        })

        test('should return an empty array if route has no bookings', () => {
            expect(getRouteIndices(new Route())).toEqual([])
        })
    })

    describe('getAllRoutesIndices', () => {
        test('should return a flat array of all routes all indices', () => {
            const firstBooking: Booking = new Booking(1, 2, 3)
            const secondBooking: Booking = new Booking(4, 5, 6)

            const firstRoute: Route = new Route(firstBooking, secondBooking)
            const secondRoute: Route = new Route(secondBooking, firstBooking)

            const allRoutes: Route[] = [firstRoute, secondRoute]

            expect(getAllRoutesIndices(allRoutes)).toEqual([1, 4, 4, 1])
        })

        test('should return an empty array if no routes have no bookings', () => {
            expect(getAllRoutesIndices([new Route(), new Route()])).toEqual([])
        })

        test('should return an empty array if no routes are provided', () => {
            expect(getAllRoutesIndices([])).toEqual([])
        })
    })

    describe('getRoutesAsString', () => {
        test('should return correct string of all routes all bookings', () => {
            const firstBooking: Booking = new Booking(1, 2, 3)
            const secondBooking: Booking = new Booking(4, 5, 6)

            const firstRoute: Route = new Route(firstBooking, secondBooking)
            const secondRoute: Route = new Route(secondBooking, firstBooking)

            const allRoutes: Route[] = [firstRoute, secondRoute]

            expect(getRoutesAsString(allRoutes)).toEqual(' \n1[2/3], 4[5/6] \n4[5/6], 1[2/3]')
        })

        test('should return an empty string if no routes have no bookings', () => {
            expect(getRoutesAsString([new Route(), new Route()])).toEqual('')
        })

        test('should return an empty string if no routes are provided', () => {
            expect(getRoutesAsString([])).toEqual('')
        })
    })
})
