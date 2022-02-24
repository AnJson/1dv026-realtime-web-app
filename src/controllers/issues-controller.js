/**
 * The Issues-controller.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

import { formatDistanceToNow } from 'date-fns'
import fetch from 'node-fetch'

/**
 * Encapsulating the Issues controller-methods.
 *
 */
export class IssuesController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * Uses possible query-parameters to filter result.
   * (GET '/issues').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      // TODO: Map the viewdata-object.
      const response = await fetch(process.env.ISSUES_URL, {
        headers: {
          authorization: `Bearer ${process.env.AUTHENTICATION_TOKEN}`
        }
      })

      const issues = await response.json()
      console.log(issues)
      const viewData = {
        issues: issues
          .map(issue => ({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            updated: formatDistanceToNow(new Date(issue.updated_at), { addSuffix: true }),
            state: issue.state,
            user: issue.author.name,
            user_avatar: issue.author.avatar_url
          }))
      }

      console.log(viewData.issues)

      res.render('issues/index', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
