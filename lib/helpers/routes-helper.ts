import Booking from '../models/Booking'
import Route from '../models/Route'

export const getRouteIndices = (route: Route): number[] =>
    route
        .getAllBookings()
        .map((booking: Booking) => booking.id)

export const getAllRoutesIndices = (routes: Route[]): number[] =>
    routes
    .map((route: Route) => getRouteIndices(route))
    .reduce((ids: number[], moreIds: number[]) => [...ids, ...moreIds], [])

export const getRoutesAsString = (routes: Route[]): string =>
    routes
        .filter((route: Route) => route.length > 0)
        .map((route: Route) => route.toString())
        .reduce((acc: string, routeString: string) => `${acc} \n${routeString}`, '')
