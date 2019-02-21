import Booking from '../models/Booking'
import Route from '../models/Route'

export const getRouteIndices = (branch: Route): number[] =>
    branch
        .getAllBookings()
        .map((booking: Booking) => booking.id)

export const getAllRoutesIndices = (routes: Route[]): number[] =>
    routes
    .map((branch: Route) => getRouteIndices(branch))
    .reduce((ids: number[], moreIds: number[]) => [...ids, ...moreIds], [])

export const printRoutes = (routes: Route[]): string =>
    routes
        .map((branch: Route) => branch.toString())
        .reduce((acc: string, branchString: string) => `${acc} \n${branchString}`, '')
