import log4js from 'log4js'

import loggerConfig from '../config/logger.config'

log4js.configure(loggerConfig)

export default log4js.getLogger()
