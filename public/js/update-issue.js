/**
 * Update-issue module.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

/**
 * Update issue in the issues-list.
 *
 * @param {object} issue - The issue to update.
 */
export const updateIssue = (issue) => {
  const issueList = document.querySelector('.issues-wrapper')
  const issueElement = issueList.querySelector(`[data-id="${issue.id}"]`)

  // Only update issue if issue is already in the list.
  if (issueElement) {
    const avatarImg = issueElement.querySelector('.issue__avatar')
    const meta = issueElement.querySelector('.issue__meta')
    const title = issueElement.querySelector('.issue__title')
    const description = issueElement.querySelector('.issue__description')

    title.textContent = issue.title
    description.textContent = issue.description
    avatarImg.setAttribute('src', issue.user_avatar)
    meta.textContent = `edited by ${issue.user} ${issue.updated}`
  }
}
