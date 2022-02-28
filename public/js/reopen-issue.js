/**
 * Reopen-issue module.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

/**
 * Sets state of issue to open in issues-list.
 *
 * @param {object} issue - The issue to add.
 */
export const reopenIssue = (issue) => {
  const issueList = document.querySelector('.issues-wrapper')
  const issueNode = issueList.querySelector(`[data-id="${issue.id}"]`)

  // Only add a issue if it's already in the list.
  if (issueNode) {
    // TODO: Implement toggeling state of issue.
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
