'use strict'

import * as parser from '~/app/utils/parser-factory'
import logger from '~/config/logger'
import Gpgga from '~/app/models/gpgga'
import Gprmc from '~/app/models/gprmc'
import Raw from '~/app/models/raw'

export const onReceive = (message, deviceId) => {
  let messages = message.toString('UTF-8')
  messages = messages.split('$')
  let datas = []
  for (let m of messages) {
    if (m) {
      let data = parser.parse(m)
      if (data) {
        logger.debug `push ${data}`
        data.deviceId = deviceId
        datas.push(data)
      }
    }
  }
  return datas
}

export const save = async (datas) => {
  let promises = []
  for (let data of datas) {
    switch (data.messageId) {
      case parser.GPGGA:
        promises.push(new Gpgga(data).save())
        break
      case parser.GPRMC:
        promises.push(new Gprmc(data).save())
        break
      default:
        promises.push(new Raw(data).save())
        break
    }
  }
  await Promise.all(promises)
}
