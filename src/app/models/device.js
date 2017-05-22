'use strict'

import mongoose, {Schema} from 'mongoose'

const DeviceSchema = new Schema({
  name: {type: String, required: true, unique: true},
  vehical: {type: String, required: true}
}, {
  collection: 'device'
})

export default mongoose.model('Device', DeviceSchema)
