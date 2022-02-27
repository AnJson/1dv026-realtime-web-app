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
        const userId = issueData.action === 'update' ? issueData.last_edited_by_id : issueData.author_id

        const user = await this.getData(`${process.env.USERS_URL}?id=${userId}`)

        issue = {
          id: issueData.id,
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
        console.log(issue)
        if (issue.action === 'update') {
          console.log('UPDATED ISSUE!')
        }

        if (issue.action === 'close') {
          console.log('CLOSED ISSUE!')
        }

        if (issue.action === 'reopen') {
          console.log('REOPENED ISSUE!')
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
  async getData (url) {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${process.env.AUTHENTICATION_TOKEN}`
      }
    })

    return response.json()
  }
}
