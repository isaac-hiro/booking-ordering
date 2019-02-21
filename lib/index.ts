import Koa from 'koa'
import route from 'koa-route'
import bodyParser from 'koa-bodyparser'
import {performance} from 'perf_hooks'

import json from '../test/mock-data/bookings4.json'

import { arrangeBookings } from './bookings-arranger'
import logger from './helpers/logger'

const server = new Koa()

server.use(bodyParser())
server.listen(4000, () => logger.info('Server started on port 4000'))

arrangeBookings(json)

const orderedBookingsHandler = (ctx: Koa.Context) => {
    const startTime: number = performance.now()

    ctx.body = arrangeBookings(ctx.request.body)

    const endTime: number = performance.now()

    logger.info(`Request took: ${endTime - startTime} ms`)
}

server.use(route.post('/api/orderedBookings', orderedBookingsHandler))

server.use((ctx: Koa.Context) => {
    ctx.body = 'Invalid request'
})
