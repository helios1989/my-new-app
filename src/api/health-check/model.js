import mongoose, { Schema } from 'mongoose'

const healthCheckSchema = new Schema({}, { timestamps: true })

healthCheckSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('HealthCheck', healthCheckSchema)

export const schema = model.schema
export default model
