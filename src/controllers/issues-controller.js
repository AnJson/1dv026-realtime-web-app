/**
 * The Issues-controller.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

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

      const viewData = {
        issues: await response.json()
      }

      console.log(viewData.issues)

      res.render('issues/index', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
