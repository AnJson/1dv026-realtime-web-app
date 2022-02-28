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
   * Load the issue.
   * (param 'id').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The id of the issue.
   */
  async loadIssue (req, res, next, id) {
    try {
      const issue = await this.#getData(`${process.env.ISSUES_URL}/${id}`)

      if (!issue.iid || issue.iid !== Number.parseInt(id)) {
        const error = new Error('Not found')
        error.status = 404
        next(error)
        return
      }

      req.issue = issue

      next()
    } catch (error) {
      next(error)
    }
  }

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
      const issues = await this.#getData(process.env.ISSUES_URL)

      const viewData = {
        issues: issues
          .map(issue => ({
            id: issue.iid,
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
      if (req.issue.state === 'closed') {
        req.session.flash = { type: 'error', text: 'Issue is already closed.' }
        res.redirect('..')
        return
      }

      await this.#postRequest(`${process.env.ISSUES_URL}/${req.issue.iid}`, {
        state_event: 'close'
      })

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
      if (req.issue.state === 'opened') {
        req.session.flash = { type: 'error', text: 'Issue is already open.' }
        res.redirect('..')
        return
      }

      await this.#postRequest(`${process.env.ISSUES_URL}/${req.issue.iid}`, {
        state_event: 'reopen'
      })

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
  async #getData (url) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.AUTHENTICATION_TOKEN}`
      }
    })

    return response.json()
  }

  /**
   * Send authorized post-request to gitlab.
   *
   * @param {string} url - Express request object.
   * @param {object} data - Request-body.
   * @returns {Promise} - A promise for response-object.
   */
  async #postRequest (url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTHENTICATION_TOKEN}`
      },
      body: JSON.stringify(data)
    })
  }
}
