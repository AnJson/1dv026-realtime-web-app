/**
 * The Home-controller.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

/**
 * Encapsulating the Home controller-methods.
 *
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * Uses possible query-parameters to filter result.
   * (GET '/').
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      res.render('home/index')
    } catch (error) {
      next(error)
    }
  }
}
