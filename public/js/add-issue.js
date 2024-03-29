/**
 * Add-issue module.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

/**
 * Inserts a issue at the start of the issues-list.
 *
 * @param {object} issue - The issue to add.
 * @param {HTMLElement} template - The template for the issue.
 */
export const addIssue = (issue, template) => {
  const issueList = document.querySelector('.issues-wrapper')

  // Only add a issue if it's not already in the list.
  if (!issueList.querySelector(`[data-id="${issue.id}"]`)) {
    const issueNode = template.content.cloneNode(true)

    const issueElement = issueNode.querySelector('.issue')
    const avatarImg = issueNode.querySelector('.issue__avatar')
    const title = issueNode.querySelector('.issue__title')
    const meta = issueNode.querySelector('.issue__meta')
    const description = issueNode.querySelector('.issue__description')
    const closeForm = issueNode.querySelector('#close-form')
    const reopenForm = issueNode.querySelector('#reopen-form')
    const editLink = issueNode.querySelector('.issue__footer-link')

    issueElement.setAttribute('data-id', issue.id)

    avatarImg.setAttribute('src', issue.user_avatar)
    title.textContent = issue.title
    meta.textContent = `edited by ${issue.user} ${issue.updated}`
    description.textContent = issue.description
    closeForm.setAttribute('action', `./close/${issue.id}`)
    reopenForm.setAttribute('action', `./reopen/${issue.id}`)
    editLink.setAttribute('href', `./edit/${issue.id}`)

    issueList.prepend(issueNode)
  }
}
