/**
 * The webhooks-controller.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

// import { Issue } from '../models/issues.js'

/**
 * Encapsulating the webhooks controller-methods.
 *
 */
export class WebhooksController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * Uses possible query-parameters to filter result.
   * (POST '/webhooks').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async indexPost (req, res, next) {
    try {
      console.log('------------- Hello! --------------')
      let issue = null

      if (req.body.event_type === 'issue') {
        issue = req.body.object_attributes
      }

      // Respond quickly to signal succesfully recieved.
      res.status(200).end()

      // Check what type of data and what kind of event to send to client.
      // And save to db.
      if (issue) {
        console.log(issue)
      }
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.status = 500
      next(err)
    }
  }

  /**
   * Validate matching tokens from webhook with defined env-token.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Function} - Express next middleware function with error-object.
   */
  async authenticate (req, res, next) {
    console.log('---------Authenticate--------')

    if (req.headers['x-gitlab-token'] !== process.env.WEBHOOK_SECRET) {
      const error = new Error('Invalid token')
      error.status = 401
      return next(error)
    }

    next()
  }
}
