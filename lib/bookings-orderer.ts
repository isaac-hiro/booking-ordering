import logger from './helpers/logger'
import Booking from './models/Booking'
import Route from './models/Route'
import { convertInputDataToBookings, removeBookings } from './helpers/bookings-helper'
import { getAllRoutesIndices, getRoutesAsString } from './helpers/routes-helper'

let lengthOfLongestRoute: number = 0
let longestRouteIndex: number = -1

export const orderBookings = (data: any): number[] => {
    const allRoutes: Route[] = []
    const allBookings: Booking[] = convertInputDataToBookings(data)

    if (!allBookings.length) {
        logger.warn('No bookings provided.')
        return []
    }

    createRoute(allBookings, allRoutes)
    tryToConnectRoutes(allRoutes)

    logResults(allRoutes)

    return getAllRoutesIndices(allRoutes)
}

/* Private methods */

const createRoute = (allBookings: Booking[], allRoutes: Route[]): void => {
    const longestRoute: Route = getLongestRoute(allBookings)
    const restOfBookings: Booking[] = removeBookings(allBookings, longestRoute.getAllBookings())

    allRoutes.push(longestRoute)

    if (restOfBookings.length) {
        createRoute(restOfBookings, allRoutes)
    }
}

const getLongestRoute = (allBookings: Booking[]): Route => {
    const allPossibleRoutes: Route[] = []
    const root: Booking = allBookings[0]

    resetGlobalVariables()
    createPossibleRoute(new Route(root), allBookings, allPossibleRoutes)

    return allPossibleRoutes[longestRouteIndex]
}

const createPossibleRoute = (route: Route, allBookings: Booking[], allPossibleRoutes: Route[]): void => {
    const bookingsWithoutRouteBookings: Booking[] = removeBookings(allBookings, route.getAllBookings())
    const lastBooking: Booking | undefined = route.getLastBooking()

    const possibleConnections: Booking[] = bookingsWithoutRouteBookings.filter((booking: Booking) =>
        lastBooking && booking.start === lastBooking.end)

    const isLongerRoutePossible: boolean = route.length + possibleConnections.length > lengthOfLongestRoute

    if (!isLongerRoutePossible) {
        return
    }

    if (possibleConnections.length) {
        possibleConnections.forEach((booking: Booking) =>
            createPossibleRoute(new Route(...route.getAllBookings(), booking), allBookings, allPossibleRoutes))
        return
    }

    lengthOfLongestRoute = route.length
    longestRouteIndex = allPossibleRoutes.length

    allPossibleRoutes.push(route)
}

const tryToConnectRoutes = (allRoutes: Route[]): void => {
    allRoutes.forEach((route: Route, routeIndex: number) => {
        allRoutes.forEach((routeToConnect: Route, routeToConnectIndex: number) => {
            if (routeIndex === routeToConnectIndex) {
                return
            }

            const lastBookingOfRoute: Booking = route.getLastBooking()!
            const firstBookingOfRouteToConnect: Booking = routeToConnect.getFirstBooking()!

            if (firstBookingOfRouteToConnect.start === lastBookingOfRoute.end) {
                route.appendMultiple(...routeToConnect.getAllBookings())
                allRoutes.splice(routeToConnectIndex, 1)
            }
        })
    })
}

const resetGlobalVariables = (): void => {
    longestRouteIndex = 0
    lengthOfLongestRoute = 0
}

const logResults = (allRoutes: Route[]): void => {
    logger.info(`
        \nRoutes found: ${getRoutesAsString(allRoutes)}
        \nRelocations required: ${allRoutes.length - 1}
    `)
}
