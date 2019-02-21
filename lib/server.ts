import Koa from 'koa'
import route from 'koa-route'
import bodyParser from 'koa-bodyparser'
import {performance} from 'perf_hooks'

import { orderBookings } from './bookings-orderer'
import logger from './helpers/logger'

const server = new Koa()

server.use(bodyParser())

const orderedBookingsHandler = (ctx: Koa.Context) => {
    const startTime: number = performance.now()
    const requestData: any = ctx.request.body

    if (!requestData || !requestData.length) {
        ctx.throw(400, 'Invalid request')
    }

    ctx.body = orderBookings(requestData)

    const endTime: number = performance.now()

    logger.info(`Request took: ${endTime - startTime} ms`)
}

server.use(route.post('/api/orderedBookings', orderedBookingsHandler))

server.use((ctx: Koa.Context) => {
    ctx.throw(400, 'Invalid request')
})

if (process.env.NODE_ENV !== 'test') {
    server.listen(4000, () => logger.info('Server started on port 4000'))
}

export default server
