/**
 * Toggle the open/close-state module.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

/**
 * Toggle open/close-state of issue in issues-list.
 *
 * @param {object} issue - The issue to change the state of.
 * @param {string} action - Open or close.
 */
export const toggleIssueState = (issue, action) => {
  const issueList = document.querySelector('.issues-wrapper')
  const issueElement = issueList.querySelector(`[data-id="${issue.id}"]`)

  // Only toggle state of issue if issue is already in the list.
  if (issueElement) {
    const avatarImg = issueElement.querySelector('.issue__avatar')
    const meta = issueElement.querySelector('.issue__meta')
    const closeLabel = issueElement.querySelector('.issue__closed-label')
    const closeForm = issueElement.querySelector('#close-form')
    const reopenForm = issueElement.querySelector('#reopen-form')

    if ((action === 'open' && issueElement.classList.contains('issue--closed')) || (action === 'close' && !issueElement.classList.contains('issue--closed'))) {
      issueElement.classList.toggle('issue--closed')
      avatarImg.setAttribute('src', issue.user_avatar)
      meta.textContent = `edited by ${issue.user} ${issue.updated}`
      closeLabel.classList.toggle('hidden')
      closeForm.classList.toggle('hidden')
      reopenForm.classList.toggle('hidden')
    }
  }
}
