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
   * Fetches issues from gitlab and sends data to view.
   * (GET '/issues').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const issues = await this.getData(process.env.ISSUES_URL)

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

      res.render('issues/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * Fetches issue from gitlab and sends to view.
   * (GET '/edit/:id').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async edit (req, res, next) {
    try {
      // TODO: Fetch issue and map viewData.

      /* const response = await fetch(process.env.ISSUES_URL, {
        headers: {
          authorization: `Bearer ${process.env.AUTHENTICATION_TOKEN}`
        }
      }) */

      const viewData = null // NOTE: Fix viewData

      res.render('issues/edit', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates the issue on gitlab and redirects to home.
   * (POST '/edit/:id').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async editPost (req, res, next) {
    try {
      // TODO: Update the post and use PRG-pattern.

      req.session.flash = { type: 'success', text: 'Successfully updated issue.' }
      res.redirect('.') // NOTE: Check the redirect.
    } catch (error) {
      req.session.flash = { type: 'error', text: error.message }
      res.redirect('.')
    }
  }

  /**
   * Close the issue and redirect to home.
   * (POST '/close/:id').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async closePost (req, res) {
    try {
      console.log(`Close issue ${req.params.id}`)
      // TODO: Update the post and use PRG-pattern.

      req.session.flash = { type: 'success', text: 'Successfully closed issue.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'error', text: 'Unable to close the issue, try again.' }
      res.redirect('..')
    }
  }

  /**
   * Reopen the issue and redirect to home.
   * (POST '/reopen/:id').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async reopenPost (req, res) {
    try {
      console.log(`Reopen issue ${req.params.id}`)
      // TODO: Update the post and use PRG-pattern.

      req.session.flash = { type: 'success', text: 'Successfully reopened issue.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'error', text: 'Unable to reopen the issue, try again.' }
      res.redirect('..')
    }
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
