/**
 * The webhooks-controller.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import { formatDistanceToNow } from 'date-fns'

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
      let issue = null

      // Respond quickly to signal succesfully recieved.
      res.status(200).end()

      if (req.body.event_type === 'issue') {
        const issueData = req.body.object_attributes

        const user = await this.#getData(`${process.env.USERS_URL}?id=${issueData.author_id}`)

        issue = {
          id: issueData.iid,
          title: issueData.title,
          description: issueData.description,
          updated: formatDistanceToNow(new Date(issueData.updated_at), { addSuffix: true }),
          user: user[0].name,
          user_avatar: user[0].avatar_url,
          action: issueData.action
        }
      }

      // Check what type of data and what kind of event to send to client.
      // And save to db.
      if (issue) {
        if (issue.action === 'update') {
          res.io.emit('issue/update', issue)
        }

        if (issue.action === 'close') {
          res.io.emit('issue/close', issue)
        }

        if (issue.action === 'reopen') {
          res.io.emit('issue/reopen', issue)
        }

        if (issue.action === 'open') {
          res.io.emit('issue/create', issue)
        }
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
    if (req.headers['x-gitlab-token'] !== process.env.WEBHOOK_SECRET) {
      const error = new Error('Invalid token')
      error.status = 401
      return next(error)
    }

    next()
  }

  /**
   * Send authorized get-request to gitlab.
   *
   * @param {string} url - Express request object.
   * @returns {Promise} - A promise fetched data as json.
   */
  async #getData (url) {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${process.env.AUTHENTICATION_TOKEN}`
      }
    })

    return response.json()
  }
}
