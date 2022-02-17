/**
 * Issues model.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import { formatDistanceToNow } from 'date-fns'

const { Schema } = mongoose

const issuesSchema = new Schema(
  {
    // NOTE: add code.
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true, // Include virtual-fields when getting data.
      /**
       * Performs a transformation of the resulting object to remove sensitive information.
       *
       * @param {object} doc - The mongoose document which is being converted.
       * @param {object} ret - The plain object representation which has been converted.
       */
      transform: function (doc, ret) {
        delete ret._id
        delete ret.__v
      }
    }
  }
)

/**
 * Map the _id to id.
 *
 */
issuesSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

/**
 * Add the virtual property timeSinceCreated to be available on the document-object.
 *
 */
issuesSchema.virtual('timeSinceCreated').get(function () {
  return formatDistanceToNow(this.createdAt, { addSuffix: true })
})

export const Issue = mongoose.model('Issues', issuesSchema)
